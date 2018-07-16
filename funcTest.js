// get personal API keys for the keys.js file to use
require("dotenv").config();

// fimport the API keys. 
var keys = require("./keys");

// get the constructers form the constructer file
var constructors = require("./constructors");
var Song = constructors.Song
var Movie = constructors.Movie
//var song1 = new Song('noam')

//import all of the required modules
var fs = require('fs')
var request = require('request');
var Twitter = require('twitter');
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);






// function doWhatItSays() {
//     fs.readFile('./random.txt', 'utf8', function (err, data) {
//         if (!err) {
//             functionToCall = data.split(',')[0];
//             value = data.split(',')[1];

//             console.log(functionToCall)
//             console.log(value)
//             console.log(getInput("whats your name"))
//         }
//     });
// }


// //ask for the song. 
// function spotifyThisSong(track) {
//     spotify.search({
//         type: 'track',
//         query: track
//     }, function (err, data) {
//         if (!err) {
//             var questions = {
//                 type: 'input',
//                 message: `${data.tracks.items.length} mathches were found how many would you like to see?`,
//                 name: 'quantity'
//             }
//             prompt(questions).then(function (answers) {
//                 var count = parseInt(answers.quantity)
//                 while (count != 0) {
//                     var song1 = new Song(data.tracks.items[count]);
//                     song1.print();
//                     count--;
//                 }
//             })
//         } else {
//             return console.log('Error occurred: ' + err);
//         }
//     });
// }

// spotifyThisSong('rap')










// var prompt = inquirer.createPromptModule();

// // function askQuestion(message) {
// //     questions = {
// //         type: 'input',
// //         name: 'answer',
// //         message: message
// //     }
// //     prompt(questions).then(function (answers) {
// //         callData.input = answers.answer
// //     })
// // }

// function getData() {
//     var questions = {
//         type: 'list',
//         name: 'selection',
//         choices: [{
//             name: 'my-tweets',
//             short: 'my-tweets - has been selected'
//         }, {
//             name: 'spotify-this-song',
//             short: 'spotify-this-song - has been selected'
//         }, {
//             name: 'movie-this',
//             short: 'movie-this - has been selected'
//         }, {
//             name: 'do-what-it-says',
//             short: 'do-what-it-says - has been selected'
//         }]
//     }
//     prompt(questions).then(function (answers) {
//         switch (answers.selection) {
//             case 'my-tweets':
//                 console.log('tweet');
//                 break;
//             case 'spotify-this-song':
//                 callData.functionToCall = 'spotify-this-song'
//                 askQuestion('hello')
//                 // spotifyThisSong()
//                 break;
//             case 'movie-this':
//                 movieThis();
//                 break;
//             case 'do-what-it-says':
//                 doWhatItSays();
//                 break;
//             default:
//                 console.log('Sorry, somthing went wrong');
//         }
//     });
// }


// // getData()

var prompt = inquirer.createPromptModule();

var liriInstructions = {
    action: '',
    userAnswer: ''
}

var liriAction = {
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

var getLiriAction = new Promise(function (resolve, reject) {
    prompt(liriAction).then(function (answers) {
        liriInstructions.action = answers.selection
        resolve()
    });
});

function test() {
    var getLiriInput = new Promise(function (resolve, reject) {
        switch (liriInstructions.action) {
            case 'my-tweets':
                var questions = {
                    type: 'input',
                    message: 'teitter',
                    name: 'track'
                }
                prompt(questions).then(function (answers) {
                    liriInstructions.action = answers.selection
                    resolve()
                });
                console.log('tweet');
                break;
            case 'spotify-this-song':
                console.log('tweet');
                break;
            case 'movie-this':
                console.log('tweet');
                break;
            case 'do-what-it-says':
                console.log('tweet');
                break;
            default:
                console.log('Sorry, somthing went wrong');
        }
    });
}








getLiriAction.then(() => {
    test()
})







// function whatToDo(selection) {
//     switch (selection) {
//         case 'my-tweets':
//             console.log('tweet');
//             break;
//         case 'spotify-this-song':
//             console.log('spotify')
//             // spotifyThisSong()
//             break;
//         case 'movie-this':
//             console.log('movie')
//             movieThis();
//             break;
//         case 'do-what-it-says':
//             console.log('do what it says')
//             doWhatItSays();
//             break;
//         default:
//             console.log('Sorry, somthing went wrong');
//     }
// }





// askQuestion.then((response) => {
//     liriInstructions.action = response
// whatToDo(response)
// })