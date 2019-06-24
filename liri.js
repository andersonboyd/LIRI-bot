require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];

function spotifyGet(){
    var song = process.argv[3];
    for(var i = 4; i < process.argv.length; i++){
        song += " " + process.argv[i];
    }
    // console.log(song);
    if(!song){
        song = "The Sign (Ace of Base)";
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
            action + "\n";
            console.log("Added to log");
        }
    });
}

function bandsGet(){
    var band = process.argv[3];
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
            for(var i in search){
                var day = moment(search[i].datetime).format("MM/DD/YYYY hh:mm a");
                console.log(day +": "+ search[i].venue.name + ", " + search[i].venue.city + ", " + search[i].venue.country);
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
            action + "\n";
            console.log("Added to log");
        }
    });
}

function movieGet(){
    var movieName = process.argv[3];;
    for(var i = 4; i < process.argv.length; i++){
        movieName += " " + process.argv[i];
    }
    if(!movieName){
        movieName = "Mr. Nobody";
    }
    // console.log(movieName);
    var query = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(query).then(
        function(response){
            var got = response.data;
            // console.log(JSON.stringify(got, null, 2));
            console.log(got.Title);
            console.log("Release year: "+got.Year);
            console.log("IMDb rating: "+got.imdbRating);
            console.log(got.Ratings[1]);
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
            action + "\n";
            console.log("Added to log");
        }
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
            fs.readFile("random.txt", "utf8", function(error, data){
                if(error){
                    return console.log(error);
                }
                // console.log(data);
                var dataArr = data.split(",");
                console.log(dataArr);
                var action = dataArr[0];
                switch(action){
                    case "concert-this":
                        var band = dataArr[1];
                        bandsGet(band);
                        break;
                    case "spotify-this-song":
                        var song = dataArr[1];
                        spotifyGet(song);
                        break;
                    case "movie-this":
                        var movieName = dataArr[1];
                        movieGet(movieName);
                        break;
                }
            });
            break;
    }
}