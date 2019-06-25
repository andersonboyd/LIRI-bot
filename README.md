# LIRI-bot
Like Siri but in the command line. Powered by node.js

This application runs a user query through various APIs based on the user command, which produces query results quicker and easier than opening a browser.

The app operates via a case switch method based on process.argv[2] in the command line, which is the location of the user's inputted command. Anything located at process.argv[3] onward in the command line is used as the user's query.

Use the "spotify-this-song" command to search Spotify for a specific track, which
will return the track name, artist, album and a Spotify link to the track.

**Spotify search screenshot here**

Use the "movie-this" command to search the online movie database for a specific movie.
This will return:
    * the title of the movie
    * the release year
    * the IMDb rating
    * the Rotten Tomatoes score (or Metacritic score if RT is unavailable)
    * the country of origin for the movie
    * the languages used in the movie
    * the actors in the movie
    * the plot of the movie

**OMDb search screenshot here**

Use the "concert-this" command to search Bandsintown for a specific artist, which will return the day, time and venue location for any of the artist's scheduled performances through the end of the year.

**BandsInTown search screenshot here**

For a cheeky surprise, use the command "do-what-it-says" to run queries in random.txt

**random.txt search screenshot here**