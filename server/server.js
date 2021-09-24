const express = require('express');
const app = express();
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// configure
app.use(cors());

// configure dotEnv
dotEnv.config({path : './config/config.env'});

// configure form data
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

app.get('/', (request, response) => {
  response.send(`<h2>Welcome to Express Server for Authentication</h2>`);
});

// connect to mongodb database
mongoose.connect(process.env.MONGO_DB_URL, {
  useCreateIndex : true,
  useFindAndModify : false,
  useNewUrlParser : true,
  useUnifiedTopology : true
}).then((response) => {
  console.log('Connected to MongoDB Successfully....... ');
}).catch((err) => {
  console.error(err);
  process.exit(1); // stop the node js process, if unable to connect to mongodb
});

// configure the routing
app.use('/users' , require('./router/userRouter'));

app.listen(port, hostname, () => {
  console.log(`Express Server is Started at http://${hostname}:${port}`);
});
