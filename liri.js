require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var song;
var band;
var movie;

function spotifyGet(){
    song = process.argv[3];
    for(var i = 4; i < process.argv.length; i++){
        song += " " + process.argv[i];
    }
    // console.log(song);
    if(!song){
        song = "The Sign (Ace of Base)";
        // console.log(song);
    }
    spotify.search({ 
        type: 'track',
        query: song,
        limit: 1
    }).then(function(response) {
            var grab = response.tracks
            // console.log(JSON.stringify(grab.items, null, 2));
            console.log(grab.items[0].name);
            console.log(grab.items[0].album.artists[0].name);
            console.log(grab.items[0].album.name);
            console.log(grab.items[0].external_urls.spotify);
        }).catch(function(err) {
            console.log(err);
        });
    fs.appendFile("log.txt", action, function(err){
        if(err){
            console.log(err);
        }
        else{
            "\n"+ action + "\n";
            console.log("Added to log");
        }
    });
}

function bandsGet(){
    band = process.argv[3];
    for(var i = 4; i < process.argv.length; i++){
        band += " " + process.argv[i];
    }
    // console.log(band);
    var query = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    axios.get(query).then(
        function(response){
            var search = response.data;
            // console.log(response);
            // console.log(JSON.stringify(search, null, 2));
            console.log(`Next tour dates for ${band} are: `)
            for(var i in search){
                var day = moment(search[i].datetime).format("MM/DD/YYYY hh:mm a");
                console.log(day +": "
                + search[i].venue.name + ", "
                + search[i].venue.city + ", "
                + search[i].venue.country);
            }
        }
    ).catch(function(error){
        if(error.response){
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        }else if(error.request){
            console.log(error.request);
        }else{
            console.log("Error:", error.message);
        }
        console.log(error.config);
    });
    fs.appendFile("log.txt", action, function(err){
        if(err){
            console.log(err);
        }
        else{
            "\n"+ action + "\n";
            console.log("Added to log");
        }
    });
}

function movieGet(){
    movie = process.argv[3];
    for(var i = 4; i < process.argv.length; i++){
        movie += " " + process.argv[i];
    }
    if(!movie){
        movie = "Mr. Nobody";
    }
    // console.log(movie);
    var query = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(query).then(
        function(response){
            var got = response.data;
            // console.log(JSON.stringify(got, null, 2));
            console.log(got.Title);
            console.log("Release year: "+got.Year);
            console.log("IMDb rating: "+got.imdbRating);
            console.log(`${got.Ratings[1].Source}: ${got.Ratings[1].Value}`);
            console.log("Country of origin: "+got.Country);
            console.log("Language: "+got.Language);
            console.log("Actors: "+got.Actors);
            console.log("Plot: "+got.Plot);
        }
    ).catch(function(error){
        if(error.response){
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        }else if(error.request){
            console.log(error.request);
        }else{
            console.log("Error:", error.message);
        }
        console.log(error.config);
    });
    fs.appendFile("log.txt", action, function(err){
        if(err){
            console.log(err);
        }
        else{
            "\n"+ action + "\n";
            console.log("Added to log");
        }
    });
}

function read() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }else{
            var dataArr = data.split(",");
            for(var i = 0; i < 3; i++){
                var foo = dataArr[i * 2];
                var bar = dataArr[(i * 2) + 1];
                switch(foo){
                    case "spotify-this-song":
                        song = bar;
                        spotify.search({ 
                            type: 'track',
                            query: song,
                            limit: 1
                        }).then(function(response) {
                                var grab = response.tracks
                                console.log(grab.items[0].name);
                                console.log(grab.items[0].album.artists[0].name);
                                console.log(grab.items[0].album.name);
                                console.log(grab.items[0].external_urls.spotify);
                            }).catch(function(err) {
                                console.log(err);
                            });
                    break;
                    case "movie-this":
                        movie = bar;
                        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
                        axios.get(queryUrl).then(
                            function(response){
                                var got = response.data;
                                console.log(got.Title);
                                console.log("Release year: "+got.Year);
                                console.log("IMDb rating: "+got.imdbRating);
                                console.log(`${got.Ratings[1].Source}: ${got.Ratings[1].Value}`);
                                console.log("Country of origin: "+got.Country);
                                console.log("Language: "+got.Language);
                                console.log("Actors: "+got.Actors);
                                console.log("Plot: "+got.Plot);
                            }
                        ).catch(function(error){
                            if(error.response){
                                console.log("---------------Data---------------");
                                console.log(error.response.data);
                                console.log("---------------Status---------------");
                                console.log(error.response.status);
                                console.log("---------------Status---------------");
                                console.log(error.response.headers);
                            }else if(error.request){
                                console.log(error.request);
                            }else{
                                console.log("Error:", error.message);
                            }
                            console.log(error.config);
                        });
                    break;
                    case "concert-this":
                        band = bar;
                        var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
                        axios.get(queryURL).then(
                            function(response){
                                var search = response.data;
                                console.log(`Next tour dates for ${band} are: `)
                                for(var i in search){
                                    var day = moment(search[i].datetime).format("MM/DD/YYYY hh:mm a");
                                    console.log(day +": "
                                    + search[i].venue.name + ", "
                                    + search[i].venue.city + ", "
                                    + search[i].venue.country);
                                }
                            }
                        ).catch(function(error){
                            if(error.response){
                                console.log("---------------Data---------------");
                                console.log(error.response.data);
                                console.log("---------------Status---------------");
                                console.log(error.response.status);
                                console.log("---------------Status---------------");
                                console.log(error.response.headers);
                            }else if(error.request){
                                console.log(error.request);
                            }else{
                                console.log("Error:", error.message);
                            }
                            console.log(error.config);
                        });
                    break;
                }
            }
        }
        fs.appendFile("log.txt", action, function(err){
            if(err){
                console.log(err);
            }
            else{
                "\n"+ action + "\n";
                console.log("Added to log");
            }
        });
    });
}

if(action === undefined){
    console.log("Please enter a valid command");
}else{
    switch(action){
        case "concert-this":
            bandsGet();
            break;
        case "spotify-this-song":
            spotifyGet();
            break;
        case "movie-this":
            movieGet();
            break;
        case "do-what-it-says":
            read();
            break;
    }
}