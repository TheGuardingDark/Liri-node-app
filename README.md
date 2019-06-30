# Liri-node-app
## homework app/like siri, but for language instead of speech
### javascript/node/axios/inquirer

#### Notes For Running the App
=================================
Liri can be run from a CLI app using node. In order to successfully utilize Liri, you will need to get a spotify id and secret number and save them in a .env file using the following format:

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret


APP FUNCTIONALITY
=====================
--run liri through your command line with node.
-- an inquirer prompt will give you several options: concert-this, spotify-this, movie-this, just do it, and an exit option.

### Concert-This
--Choosing concert-this will prompt for the name of a band. Once submitted, it will query the [Bands in Town API](https://www.artists.bandsintown.com/bandsintown-api "Bands in Town") and return a list of upcoming tour dates, their venue name, and their location.

###Spotify-This
--Choosing spotify-this will prompt for the name of a song track. Once submitted, it will query the Spotify api to return a list of albums containing this track, along with the artist name, and a spotify link to the song.

###Movie-This
--Choosing movie-this will prompt for the name of a film. Once submitted, it will query the [OMDB API](http://www.omdbapi.com/ "OMDB") and return information on the film, including: the year it was released, its rating, the main actors, a short synopsis, the country of origin, and a rating from both IMDB and Rotten Tomatoes.

###Just Do It
--Choosing to Just Do It will execute any commands found in the random.txt file. To change the commands use the following format:
Liri Command, query

##Log
--In addition to console logging information for each command, Liri will make a log entry into the log.txt file and allow you to review previous searches.
