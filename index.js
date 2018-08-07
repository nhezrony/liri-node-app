require("dotenv").config();

var keys = require("./keys");
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var questions = {
    action: {
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
    },
    song: {
        type: 'input',
        name: 'selection',
        message: 'what song would you like to lookup'
    },
    songQty: {
        type: 'list',
        name: 'selection',
        message: 'multiple matches were found, how many would you like to see?',
        choices: [{
            name: '1',
            short: '1-match - has been selected'
        }, {
            name: '20',
            short: '20-matches - has been selected'
        }]
    },
    movie: {
        type: 'input',
        name: 'selection',
        message: 'Please type the movie you would like to search:'
    }
}

var ask = async (question) => {
    return new Promise((resolve, reject) => {
        var prompt = inquirer.createPromptModule();
        prompt(question).then(answers =>
            resolve(answers.selection))
    })
}

var myTweets = async () => {
    client.get('statuses/user_timeline', {
        count: 20
    }, function (error, tweets, response) {
        if (!error) {
            totalTweets = tweets[0].user.statuses_count;
            ((totalTweets >= 20) ? tweetCount = 20 : tweetCount = totalTweets)
            while (tweetCount != 0) {
                created = moment(tweets[tweetCount - 1].created_at, 'ddd MMM DD HH:mm:ss Z YYYY').format('ddd MMM DD YYYY, hh:mm a')
                tweet = tweets[tweetCount - 1].text
                console.log(`\nTweet ${tweetCount}: ${tweet} \n-- Post Date: ${created}`)
                tweetCount--;
            }
        }
    });
}

var spotifyThisSong = async (song) => {
    spotify.search({
        type: 'track',
        query: song
    }, async (err, data) => {
        if (!err) {
            results = await (data.tracks.items).length;
            ((results > 1) ? qty = await ask(questions.songQty) : qty = 1)
            while (qty != 0) {
                var track = data.tracks.items[qty - 1];
                var artist = track.artists[0].name;
                var album = track.album.name;
                var song = track.track_number;
                var name = track.name;
                var link = track.external_urls.spotify;
                console.log('----------------------------------------------------------------------------------------------------')
                console.log(`"${name}" is the ${song} song in the "${album}" album by "${artist}"`)
                console.log(`here is a ling for the song on spotify "${link}"`)
                console.log('----------------------------------------------------------------------------------------------------')
                qty--;
            }
        } else {
            console.log(err.code)
        }
    });

}

var movietThis = async (movie) => {
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
            console.log(`Title: ${title}\nYear Released: ${year}\nCountry: ${country}\nLanguage: ${language}\nPlot: ${plot}\nActors :${actors}\nIMBD Rating: ${imdbRating}\nRotten Tomatoes Rating: ${rottenTomatoesRating}`)
            console.log('----------------------------------------------------------------------------------------')
        }
    });
}

var doWhatItSays = async () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./random.txt', 'utf8', (err, data) => {
            if (!err) {
                switch (data.split(',')[0]) {
                    case 'my-tweet':
                        myTweets()
                        break;
                    case 'spotify-this-song':
                        spotifyThisSong(data.split(',')[1])
                        break;
                    case 'movie-this':
                        movietThis(data.split(',')[1]);
                        break;
                }
            }
            resolve()
        })
    })
}

var liri = async () => {
    var selection = await ask(questions.action)
    switch (selection) {
        case 'my-tweets':
            await myTweets()
            break;
        case 'spotify-this-song':
            var song = await ask(questions.song)
            await spotifyThisSong(song)
            break;
        case 'movie-this':
            var movie = await ask(questions.movie);
            var movie = ((movie == '') ? 'Mr. Nobody' : movie)
            movietThis(movie);
            break;
        case 'do-what-it-says':
            await doWhatItSays()
            break;
    }
}
liri()