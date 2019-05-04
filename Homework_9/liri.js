require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var request = require('request');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var input = process.argv;
var action = input[2];
var value = input[3];


switch (action) {
	case "concert-this":
		(value);
		break;

	case "spotify-this-song":
		SpotifyThis(value);
		break;

	case "movie-this":
		MovieThis(value);
		break;

	case "do-what-it-says":
		DoSomething(value);
		break;
};

function ConcertThis(artist) {
	var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
};
//console.log ("Venue:" + VenueName)
//console.log ("Location:" + VenueLocation)
//console.log ("Date:" + VenueDate)
//Still need an API key for the concer-this function to work 

function SpotifyThis(song) {
	if (song === undefined) {
		song = 'The Sign';
		spotify
			.request('https://api.spotify.com/v1/search?q=track:the%20sign%20artist:ace%20of%20base&type=track&limit=1')
			.then(function (data) {
				var songInfo = data.tracks.items;
				console.log("Artist: " + songInfo[0].artists[0].name);
				console.log("Song: " + songInfo[0].name);
				console.log("Album: " + songInfo[0].album.name);
				console.log("Preview on Spotify: " + songInfo[0].preview_url);
			})
			.catch(function (err) {
				console.error('Error occurred: ' + err);
			});
	}

	else {

		spotify.search({ type: 'track', query: song }, function (err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);

			}

			var songInfo = data.tracks.items;
			console.log("Artist(s): " + songInfo[0].artists[0].name);
			console.log("Song Name: " + songInfo[0].name);
			console.log("Preview Link: " + songInfo[0].preview_url);
			console.log("Album: " + songInfo[0].album.name);
		});
	};
};

function MovieThis(movie) {
	if (movie === undefined) {
		movie = "Mr.Nobody";
	};

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

	axios.get(queryUrl).then(function (response) {

		var rottenRating;
		var rottenRatingObj = response.data.Ratings.find(x => x.Source === "Rotten Tomatoes");
		if (rottenRatingObj !== undefined) {
			rottenRating = rottenRatingObj.Value;
		}
		else {
			rottenRating = "NA";
		};

		console.log("Title: " + response.data.Title);
		console.log("Release Year: " + response.data.Year);
		console.log("IMDB Rating: " + response.data.imdbRating);
		console.log("Rotten Tomatoes Rating: " + rottenRating);
		console.log("Country: " + response.data.Country);
		console.log("Language: " + response.data.Language);
		console.log("Plot: " + response.data.Plot);
		console.log("Actors: " + response.data.Actors);
	}
	)
};

function DoSomething() {
	fs.readFile('random.txt', "utf8", function (error, data) {
		var txt = data.split(',');
		action = txt[0];
		value = txt[1];
		switch (action) {
			case "spotify-this-song":
				SpotifyThis(value);
				break;

			case "movie-this":
				movieThis(value);
				break;
		}
	});
}