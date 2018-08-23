$(document).ready(function(){

    var api_key = config.TMDB_API;
    var baseimg = "https://image.tmdb.org/t/p/original";
    var tmdb = theMovieDb;
    var resultJSON = {};

    // take the movie_id that was stored in the local storage
    var movie_id = localStorage.movie_id;

    // Movie Details
    var Movie_Details = {
      title : "title",
      year : "0000",
      runtime : "0",
      poster_path: "poster path",
      backdrop_path: "backdrop path",
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
        Movie_Details.runtime = resultJSON.runtime;
        Movie_Details.poster_path = resultJSON.poster_path;
        Movie_Details.backdrop_path = resultJSON.backdrop_path;
        Movie_Details.overview = resultJSON.overview;

        // Load movie details onto the page
        load_page_details();
    }

    // Display Movie Info
    function load_page_details() {

        // Movie Backdrop
        var complete_backdrop_url = baseimg + Movie_Details.backdrop_path;
        document.getElementById("movie_backdrop").style.backgroundImage = "url(" + complete_backdrop_url + ")";

        $("#movie_title").text(Movie_Details.title);
        $("#movie_year").text(Movie_Details.year);
        $("#movie_runtime").text(Movie_Details.runtime + " min")

        // Movie poster
        var complete_poster_url = baseimg + Movie_Details.poster_path;
        document.getElementById("movie_poster").src = complete_poster_url;

        $("#movie_overview").text(Movie_Details.overview);

    }

});
