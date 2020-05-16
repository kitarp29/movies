const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const omdb = new(require('omdbapi'))('e343ee42');
var path = require("path");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

var naam = "";
var pic = "";
var link = "";
var year = "";
var rate = "";
var imdb = "";
var ms = "";
var plot="";
var time = "";
var a="";
app.post("/", function(req, response) {
  var query = req.body.movie;

  omdb.search({
    search: query, // required
  }).then(res => {
    console.log('got response:', res[0]);
    query = res[0].imdbid;
    naam = res[0].title;
    pic = res[0].poster;
    link = query;


    omdb.get({
      id: query,
      plot: 'full'
    }).then(res1 => {
      console.log('got response:', res1);
      year = res1.released;
      rate = res1.rated;
      imdb = res1.imdbrating;
      ms = res1.metascore;
      time = res1.runtime;
      plot = res1.plot;
      a=res1.awards;
      // response.render("search", {saal:year});
      response.render("search", {
        naam: naam,
        pic: pic,
        link: link,
        saal: year,
        rate: rate,
        imdb: imdb,
        ms: ms,
        time: time,
        plot: plot,
        a:a
      });
      response.send();
    }).catch(err=>{
      response.render("fail",{});
    });
  }).catch(err=>{
    response.render("fail",{});
  });


})



app.listen(3000, function() {
  console.log("Running at 3000");
})
