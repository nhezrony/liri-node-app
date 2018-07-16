require("dotenv").config();

// fimport the API keys. 
var keys = require("./keys");

// get the constructers form the constructer file
var constructors = require("./constructors");
var Song = constructors.Song
var Movie = constructors.Movie

var fs = require('fs')
var request = require('request');
var Twitter = require('twitter');
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var prompt = inquirer.createPromptModule();
console.log(client)

function spotifyThisSong() {
    var questions = {
        type: 'input',
        message: 'Please type the song you would like to search:',
        name: 'track'
    }
    prompt(questions).then(function (answers) {
        spotify.search({
            type: 'track',
            query: answers.track
        }, function (err, data) {
            if (!err) {
                var questions = {
                    type: 'input',
                    message: `${data.tracks.items.length} mathches were found how many would you like to see?`,
                    name: 'quantity'
                }
                prompt(questions).then(function (answers) {
                    var count = parseInt(answers.quantity)
                    while (count != 0) {
                        var song1 = new Song(data.tracks.items[count]);
                        song1.print();
                        count--;
                    }
                })
            } else {
                return console.log('Error occurred: ' + err);
            }
        });
    });
}

function movieThis() {
    var questions = {
        type: 'input',
        message: 'Please type the movie you would like to search:',
        name: 'movie'
    }
    prompt(questions).then(function (answers) {
        var movie = (!answers.movie ? 'Mr. Nobody' : answers.movie)
        request(`http://www.omdbapi.com/?t=${movie}&y=&apikey=trilogy`, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var parsedResp = JSON.parse(body)
                var title = parsedResp.Title
                var year = parsedResp.Year
                var country = parsedResp.Country
                var language = parsedResp.Language
                var plot = parsedResp.Plot
                var actors = parsedResp.Actors
                var imdbRating = parsedResp.imdbRating
                var rottenTomatoesRating = ((parsedResp.Ratings.length > 1) ? parseFloat(parsedResp.Ratings[1].Value.replace('%', '')) / 10 : 'No Rotten Tomatoes Rating Available')
                console.log('----------------------------------------------------------------------------------------')
                console.log(`Title: ${title}Year Released: ${year}\nCountry: ${country}\nLanguage: ${language}\nPlot: ${plot}\nActors :${actors}\nIMBD Rating: ${imdbRating}\nRotten Tomatoes Rating: ${rottenTomatoesRating}`)
                console.log('----------------------------------------------------------------------------------------')
            }
        });
    });
}

function doWhatItSays() {
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (!err) {
            functionToCall = data.split(',')[0];
            value = data.split(',')[1];
            console.log(functionToCall)
            console.log(value)
        }
    });
}




















var questions = {
    type: 'list',
    name: 'selection',
    choices: [{
        name: 'my-tweets',
        short: 'my-tweets - has been selected'
    }, {
        name: 'spotify-this-song',
        short: 'spotify-this-song - has been selected'
    }, {
        name: 'movie-this',
        short: 'movie-this - has been selected'
    }, {
        name: 'do-what-it-says',
        short: 'do-what-it-says - has been selected'
    }]
}
prompt(questions).then(function (answers) {
    switch (answers.selection) {
        case 'my-tweets':
            console.log('tweet');
            break;
        case 'spotify-this-song':
            spotifyThisSong()
            break;
        case 'movie-this':
            movieThis();
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('Sorry, somthing went wrong');
    }
});