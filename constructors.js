function Song(song) {
    this.artist = song.artists[0].name;
    this.album = song.album.name;
    this.track = song.track_number;
    this.name = song.name;
    this.link = song.external_urls.spotify;
}
Song.prototype.print = function () {
    console.log('----------------------------------------------------------------------------------------------------')
    console.log(`"${this.name}" is the ${this.track} song in the ${this.album} album by ${this.artist}`)
    console.log(`here is a ling for the song on spotify "${this.link}"`)
    console.log('----------------------------------------------------------------------------------------------------')
};

var questions = {
    type: 'input',
    message: 'Please type the song you would like to search:',
    name: 'track'
}


function Category() {
    this.type: 'input',
        this.message: 'Please type the song you would like to search:',
        this.name: 'track'

}
Song.prototype.print = function () {
    console.log('----------------------------------------------------------------------------------------------------')
    console.log(`"${this.name}" is the ${this.track} song in the ${this.album} album by ${this.artist}`)
    console.log(`here is a ling for the song on spotify "${this.link}"`)
    console.log('----------------------------------------------------------------------------------------------------')
};







function Movie(resp) {
    this.parsedResp = JSON.parse(resp)
    this.title = parsedResp.Title
    this.year = parsedResp.Year
    this.country = parsedResp.Country
    this.language = parsedResp.Language
    this.plot = parsedResp.Plot
    this.actors = parsedResp.Actors
    this.imdbRating = parsedResp.imdbRating
    this.rottenTomatoesRating = ((parsedResp.Ratings.length > 1) ? parseFloat(parsedResp.Ratings[1].Value.replace('%', '')) / 10 : 'No Rotten Tomatoes Rating Available')
}
Movie.prototype.print = function () {
    console.log('----------------------------------------------------------------------------------------')
    console.log(`Title: ${title}Year Released: ${year}\nCountry: ${country}\nLanguage: ${language}\nPlot: ${plot}\nActors :${actors}\nIMBD Rating: ${imdbRating}\nRotten Tomatoes Rating: ${rottenTomatoesRating}`)
    console.log('----------------------------------------------------------------------------------------')
};

// exports.constructers {
//     Song: Song;
//     Movie: Movie;
// }

exports.Song = Song
exports.Movie = Movie