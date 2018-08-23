$(document).ready(function(){

    var api_key = config.TMDB_API;
    var baseimg = "https://image.tmdb.org/t/p/w300";
    var tmdb = theMovieDb;
    var resultJSON = {};

    // take the movie_id that was stored in the local storage
    var movie_id = localStorage.movie_id;

    // Movie Details
    var Movie_Details = {
      title : "title",
      year : "0000",
      poster_path: "poster_path",
      overview: "overview"
    };



    // $("#movie_title").text(localStorage.movie_id);

    var movie = tmdb.movies.getById({"id":movie_id }, id_search_successCB, id_search_errorCB)


    // Function is called when the movie is found successfully
    function id_search_successCB(data) {

        // Object created from json
        resultJSON = JSON.parse(data);

        generate_details(resultJSON);
        // console.log("Success callback");
        // console.log(resultJSON);
    };

    // Function is called when the movie is not found successfully
    function id_search_errorCB(data) {
        console.log("Error callback: " + data);
    };

    function generate_details(resultJSON){
        console.log(resultJSON);

        // Set movie variables
        Movie_Details.title = resultJSON.original_title;
        Movie_Details.year = resultJSON.release_date.substring(0, 4);
        Movie_Details.poster_path = resultJSON.poster_path;
        Movie_Details.overview = resultJSON.overview;

        // Load movie details onto the page
        load_page_details();
    }

    // Display Movie Info
    function load_page_details() {
        $("#movie_title").text(Movie_Details.title);
        $("#movie_year").text(Movie_Details.year);
        document.getElementById("movie_poster").src = baseimg + Movie_Details.poster_path;
        $("#movie_overview").text(Movie_Details.overview);

    }

});
