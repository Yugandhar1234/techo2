const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  confirm : {
    type : String,
    required : true
  },
  phone : {
    type : Number,
    required : true
  },
  image : {
    type : String,
    required : true
  },
  type : {
    type : String,
    required : true
  },
  created : {
    type : Date,
    default : Date.now
  }
});
let User = mongoose.model('user' , UserSchema);
module.exports = User;
