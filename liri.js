
// require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");

var inquirer = require("inquirer");

// var spotify = new Spotify(keys.spotify);

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
            }) 
        })};

function spotifyThis(song) {

};

function movieThis(movie) {
    // var movieName = movie.splice(2).join("+");
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
    axios.get(queryUrl).then(
        function(response) {
            // console.log(response.data);
            var film = response.data;

            console.log(`\nTitle: ${film.Title}\nRelease Year: ${film.Year}\nRated: ${film.Rated}\nCountry: ${film.Country}\nLanguage: ${film.Language}\nPlot: ${film.Plot}\nActors: ${film.Actors}\nIMDB Rating: ${film.Ratings[0].Value}\nRotten Tomatoes Rating: ${film.Ratings[1].Value}`);
            
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

    





    


`concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

