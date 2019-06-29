
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");

var spotify = new Spotify(keys.spotify);

var divider = "\n====================================================\n";

// var mainMenu = function() {

inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["concert-this", "spotify-this", "movie-this", "do it"],
        name: "action"
    }
]).then(answer => {

switch(answer.action) {
    case "concert-this":
        inquirer.prompt([
            {
                message: "What band would you like to look up?",
                name: "band",
            }
        ]).then(answer => {
            concertThis(answer.band);
                //  mainMenu();
        });
        break;
    case "spotify-this":
        inquirer.prompt([
            {
                message: "What song would you like to spotify?",
                name: "song",
                default: "The Sign",
            }
        ]).then(answer => {
            return spotifyThis(answer.song);
        });
        break;
    case "movie-this":
        inquirer.prompt([
            {
                message: "What movie would you like to look up?",
                name: "movie",
                default: "Mr. Nobody",
            }
        ]).then(answer => {
                 movieThis(answer.movie);
                // mainMenu();
            
        });
        break;
    case "do it":
        inquirer.prompt
        return justDoIt(); 
}
});
// };


// mainMenu();



function concertThis(band) {
    var bandspot = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

    axios.get(bandspot).then(
        function(response) {
            response.data.forEach(function(item) {
                let venue = item.venue.name;
                let location = item.venue.city + ", " + item.venue.country;
                let date = moment(item.datetime).format("MM/DD/YYYY");
                console.log(`Venue Name: ${venue}\nLocation: ${location}\nDate: ${date}\n`);

                fs.appendFile("log.txt", venue +"\n"+ location +"\n"+ date +"\n" + divider, function(err) {
                    if(err) throw err;
                })
            }) 
        })};

function spotifyThis(song) {

    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);  
        }
      
        data.tracks.items.forEach(function(track) {
         
      
          var songData = [
            "\nSong Name: " + track.name,
            "Album: " + track.album.name,
            "Artist: " + track.artists[0].name,
            "Spotify Link: " + track.external_urls.spotify,
            ].join("\n\n");
        
      
          console.log(songData);
      
          fs.appendFile("log.txt", songData + divider, function(err) {
            if(err) throw err;
        })
      });
      });
      

};

function movieThis(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
        function(response) {
            var film = response.data;

            var filmData = [
                "\nTitle: " + film.Title,
                "Release Year: " + film.Year,
                "Rated: " + film.Rated,
                "Country: " + film.Country,
                "Language: " + film.Language,
                "Actors: " + film.Actors,
                "IMDB Rating: " + film.Ratings[0].Value,
                "Rotten Tomatoes Rating: " + film.Ratings[1].Value,
            ].join("\n\n");

            console.log(filmData);
            
            fs.appendFile("log.txt", filmData + divider, function(err) {
                if(err) throw err;
            });

        })
        .catch(function(error) {
            if(error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
};

function justDoIt() {

};

    





    





// look into using this to run multiple prompts like reset and main menu
//    function doSomething(answers){
//     // Do whateva you want!
//   }
//   var questions = [];
//   inquirer.prompt(questions, doSomething);