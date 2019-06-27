
// require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");

var inquirer = require("inquirer");

// var spotify = new Spotify(keys.spotify);



inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["concert-this", "spotify-this", "movieThis", "do it"],
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
        return concertThis(answer.band);
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
    case "movieThis":
        inquirer.prompt([
            {
                message: "What movie would you like to look up?",
                name: "movie",
            }
        ]).then(answer => {
            return movieThis(answer.movie);
        });
        break;
    case "do it":
        inquirer.prompt
        return justDoIt(); 
}
});


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

};

function justDoIt() {

};

    





    


`concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

