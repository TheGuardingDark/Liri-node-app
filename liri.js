// all required packages and files
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");

// grabs api keys for spotify
var spotify = new Spotify(keys.spotify);

// divider for text log
var divider = "\n====================================================\n";


// main menu prompt with switch case

function mainMenu() {


inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["concert-this", "spotify-this", "movie-this", "just do it", "exit"],
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
            spotifyThis(answer.song);
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
            
        });
        break;
    case "just do it":
        return justDoIt(); 

    case "exit":
        return;
}
});
};




// function to look up concerts

function concertThis(band) {
    var bandspot = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

    axios.get(bandspot).then(
        function(response) {
            response.data.forEach(function(item) {
                let venue = item.venue.name;
                let location = item.venue.city + ", " + item.venue.country;
                let date = moment(item.datetime).format("MM/DD/YYYY");

                // logging to the prompt

                console.log(`\nVenue Name: ${venue}\nLocation: ${location}\nDate: ${date}\n`);

                // logging to the text file

                fs.appendFile("log.txt", venue +"\n"+ location +"\n"+ date +"\n" + divider, function(err) {
                    if(err) throw err;
                })
            }) 
        }); 
    };

// function to search spotify

function spotifyThis(song) {

    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);  
        }
      
        data.tracks.items.forEach(function(track) {
         
    //   create one variable of song info to make it easier to log

          var songData = [
            "\nSong Name: " + track.name,
            "Album: " + track.album.name,
            "Artist: " + track.artists[0].name,
            "Spotify Link: " + track.external_urls.spotify,
            ].join("\n\n");
        
    //   logs to the cmd prompt

          console.log(`${songData}\n`);

        //   logs to the text file

          fs.appendFile("log.txt", songData + divider, function(err) {
            if(err) throw err;
        })
      });
      });
      
};

// function to look up movie

function movieThis(movie) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
        function(response) {
            var film = response.data;


            // storing film info for easy retrieval

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

            // log to prompt

            console.log(filmData);
            
            // log to the text file

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

// function to read text file and take commands from it

function justDoIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
          };

        //   split string into array 

          var justDidIt = data.split(",");

          var action = justDidIt[0];
          var query = justDidIt[1];

        //   if band is more than one word make it search friendly
        
          var concert = justDidIt[1].split(" ").join("%20").slice(3); 


          switch (action) {
              case "spotify-this-song":
                  spotifyThis(query);
                  break;

              case "concert-this": 
                  concertThis(concert);
                  break;
              
              case "movie-this":
                  movieThis(query);
                  break;

            default:
                spotifyThis(action); 
                return;
          }
    
    });
};

    mainMenu();


