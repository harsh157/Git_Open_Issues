
/* The ContentHandler must be constructed */
function ContentHandler (request) {

    // function to render homepage
    this.displayMainPage = function(req, res, next) {
            return res.render('issues_template', {
                title: 'issues homepage'
              });
    }

    // function to get data for given link
    this.getData = function(req, res, next) {
        "use strict";

        var link = req.param('link');
        console.log(link);
        var userIndex = -1;

        //extract repo from url
        var result = link.split("/");
        for(var i =0;i<result.length;i++){
          if(result[i] == "github.com"){
            userIndex = i+1;
          }
        }
        var error = {};
        if(userIndex == -1 || userIndex+1 > result.length){
          error = {"errors": "Invalid URL"};
          return res.render('issues_template',error);
        }
        var repo = result[userIndex] +"/"+ result[userIndex+1];
        console.log(repo);
        var lastday = new Date();
        lastday.setDate(lastday.getDate() - 1);
        var last7day = new Date();
        last7day.setDate(last7day.getDate() - 7);
        var header = {"Accept": "application/json","User-Agent":"support"};
        var total = 0;
        var inLast7 = 0;
        var inLast24 = 0;
        var before7 = 0;
        var counter = 0;

        var reqLink = "https://api.github.com/search/issues";
        var propertiesObject = "type:issue state:open created:>=" + lastday.toISOString()+" repo:"+repo ;
        //get data for last 24 hours
        request.get({url:reqLink,qs:{q:propertiesObject},headers:header}, function (error, response, body) {

          if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            inLast24 = info.total_count;
            console.log(inLast24);
          } else {
            console.log(response.body) ;
            error = {"errors": "Cannot fetch data."};
            return res.render('issues_template',error);
          }
          counter++;
          console.log(counter);
          if(counter == 3){
            return resHandler(res,inLast7,inLast24,before7);
          }
        });
        propertiesObject = "type:issue state:open created:>=" + last7day.toISOString()+" repo:"+repo ;
        // get data for last 7 dayss
        request.get({url:reqLink,qs:{q:propertiesObject},headers:header}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            inLast7 = info.total_count;
            console.log(inLast7);
          } else {
            console.log(error) ;
            error = {"errors": "Cannot fetch data."};
            return res.render('issues_template',error);
          }
          counter++;
          console.log(counter);
          if(counter == 3){
            return resHandler(res,inLast7,inLast24,before7);
          }
        });
        propertiesObject = "type:issue state:open created:<" + last7day.toISOString()+" repo:"+repo ;
        // get data before 7 days
        request.get({url:reqLink,qs:{q:propertiesObject},headers:header}, function (error, response, body) {

          if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            before7 = info['total_count'];
            console.log(before7);
          } else {
            console.log(error) ;
            error = {"errors": "Cannot fetch data."};
            return res.render('issues_template',error);
          }
          counter++;
          console.log(counter);
          if(counter == 3){
            return resHandler(res,inLast7,inLast24,before7);
          }
        });

      }


}

// function to handle response
function resHandler(res,inLast7,inLast24,before7){
  console.log(inLast7+" "+inLast24+" "+before7);
  inLast7 = inLast7-inLast24;
  total = inLast7+inLast24+before7;
  return res.render('issues_template', {
      title: 'issues homepage',
      "inLast7" : inLast7,
      "inLast24" : inLast24,
      "before7" : before7,
      "total" : total
    });
}


module.exports = ContentHandler;
