const express  = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const { request } = require('http');
const { response } = require('express');

/*
  USAGE : Register a User
  URL : http://127.0.0.1:9000/users/register
  METHOD : POST
  FIELDS : firstname ,last name, email , password, confirm password , type
 */
router.post('/register', async (request, response) => {
  try {
      let {firstName ,lastName , email , password, confirm,phone , type,} = request.body;
      // check the password , confirmPassword is same or not
      if (password !== confirm) {
        return response.status(400).json({msg: 'passwords are not Matched'});
    }
      // user already exists with same email id
      let user = await User.findOne({email});
      if(user){
        return response.status(401).json({
          msg : 'Email already Exists'
        });
      }

      // encode the password
      let salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password , salt);

      // get gravatar
      let image = gravatar.url(email, {
        s : '400',
        r : 'pg',
        d : 'mm'
      });

      // insert the record
      user = new User({firstName ,lastName, email , password, confirm ,type,phone, image});
      user = await user.save(); // insert a user into  database
      response.status(200).json({
        result : 'Registration is Success'
      });
  }
  catch (err) {
    console.error(err);
    response.status(500).json({
      msg : err.message
    });
  }
});

/*
  USAGE : Login a User
  URL : http://127.0.0.1:9000/users/login
  METHOD : POST
  FIELDS : email , password
 */
router.post('/login', async (request , response) => {
  try {
      let {email , password} = request.body;

      // check email is exists
      let user = await User.findOne({email : email});
      if(!user){
        return response.status(401).json({
          msg : 'Invalid Credentials'
        });
      }

      // match the password with db encoded password
      let isMatch = await bcrypt.compare(password , user.password);
      if(!isMatch){
        return response.status(401).json({
          msg : 'Invalid Credentials'
        });
      }
      // generate a token
      let payload = {
        user : {
          id : user.id,
          name : user.name
        }
      };
      user = await User.findOne({email}).select('-confirm');
      jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: 3600000}, (err , token) => {
        if(err) throw err;
        response.status(200).json({
          result : 'Login Success',
          token : token,
          user  :user
        });
      });
  }
  catch (err) {
    console.error(err);
    response.status(500).json({
      msg : err.message
    });
  }
});

// http://127.0.0.1:9000/users/all
router.get('/all',async(request,response)=>{
  let allUsers = await User.find();
  response.status(200).json(allUsers);
})

/*
    Usage : DELETE an existing product
    URL : http://127.0.0.1:9000/users/:id
 */
    router.delete('/:id', async (request , response) => {
      let userId = request.params.id;
      try {
          let user = await User.findByIdAndDelete(userId);
          response.status(200).json(user);
      }
      catch (err) {
          console.error(err);
          response.status(500).json({msg : err.message});
      }
  });


module.exports = router;
