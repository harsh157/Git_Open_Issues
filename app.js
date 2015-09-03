var express = require('express')
  , app = express() // Web framework to handle routing requests
  , cons = require('consolidate') // Templating library adapter for Express
  , routes = require('./routes')
  , request = require('request');



  // Register our templating engine
  app.engine('html', cons.swig);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');

  // Express middleware to populate 'req.cookies' so we can access cookies
  app.use(express.cookieParser());

  // Express middleware to populate 'req.body' so we can access POST variables
  app.use(express.bodyParser());

  // Application routes
  routes(app,request);
  app.listen(process.env.PORT || 8082);
