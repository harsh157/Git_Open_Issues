var ContentHandler = require('./content')
  , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app,request) {

    var contentHandler = new ContentHandler(request);


    // The main page of the blog
    app.get('/', contentHandler.displayMainPage);

    // The main page of the blog, filtered by tag
    app.get('/getData', contentHandler.getData);



    // Error handling middleware
    app.use(ErrorHandler);
}
