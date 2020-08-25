var express         = require('express'),
    bodyParser      = require('body-parser'),
    routes          = require('./routes/route');
const cors          = require('cors');
const jwt           = require('./_helpers/jwt');
var mongoose 	      = require('mongoose');
const errorHandler  = require('./_helpers/error-handler');
require('dotenv').config();
    
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOURL}/${process.env.MONGODBNAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, user: process.env.MONGOUSER, pass: process.env.MONGOPASSWORD, useUnifiedTopology:true});
mongoose.set('useCreateIndex', true);

var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var corsOptions = {
  origin: [`${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
    `${process.env.FRONTEND_HOST}`
  ]
};
app.use(cors(corsOptions));
//app.use(jwt());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Origin', '*');   
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

routes(app);
// global error handler
app.use(errorHandler);

let server_port = process.env.BACKEND_PORT;
app.listen(server_port, function() {
  console.log('[:: INIT ::]');
  console.log(`CORS-enabled web server listening on port: ${server_port}` );
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});