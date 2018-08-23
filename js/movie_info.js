$(document).ready(function(){

    var api_key = config.TMDB_API;
    var baseimg = "https://image.tmdb.org/t/p/w300";
    var tmdb = theMovieDb;
    var resultJSON = {};

    // take the movie_id that was stored in the local storage
    var movie_id = localStorage.movie_id;
    var movie_title;

    // $("#movie_title").text(localStorage.movie_id);

    var movie = tmdb.movies.getById({"id":movie_id }, id_search_successCB, id_search_errorCB)

    // Function is called when the movie is found successfully
    function id_search_successCB(data) {

        // Object created from json
        resultJSON = JSON.parse(data);

        console.log("Success callback");
        console.log(resultJSON);
    };

    // Function is called when the movie is not found successfully
    function id_search_errorCB(data) {
        console.log("Error callback: " + data);
    };

});
