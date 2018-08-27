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
      overview: "overview",
      youtube_url: "youtube.com",
      imdb_id: "tt"
    };



    // Create "movie object"
    var movie = tmdb.movies.getById({"id":movie_id }, id_search_successCB, errorCB)
    var trailer = tmdb.movies.getVideos({"id":movie_id}, trailer_successCB, errorCB)

    // Function is called when the movie is found successfully
    function id_search_successCB(data) {

        // Object created from json
        resultJSON = JSON.parse(data);

        generate_details(resultJSON);
        // console.log("Success callback");
        // console.log(resultJSON);
    };

    // Function is called when the trailer id is found successfully
    function trailer_successCB(data) {
       var results = JSON.parse(data);
       create_trailer_link(results.results[0].key);
    }

    // Function is called when the movie is not found successfully
    function errorCB(data) {
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
        Movie_Details.imdb_id = resultJSON.imdb_id;

        // Load movie details onto the page
        load_page_details();
    }

    function create_trailer_link(youtube_key) {
        Movie_Details.youtube_url = "https://www.youtube.com/embed/" + youtube_key;
        trailer_modal(Movie_Details.youtube_url);
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

        // Movie Trailer
        //document.getElementById("trailer_btn").onclick = function() {window.open(Movie_Details.youtube_url, "_blank");};

        // Movie Overview
        $("#movie_overview").text(Movie_Details.overview);

        // IMDb Score from plugin. function taken from "https://www.imdb.com/plugins"
        document.getElementById("link_to_imdb").href = "https://www.imdb.com/title/" + Movie_Details.imdb_id + "/?ref_=plg_rt_1";
        document.getElementById("imdb_plugin").dataset.title = Movie_Details.imdb_id;
        (function(d,s,id) {
          var js,stags=d.getElementsByTagName(s)[0];
            if(d.getElementById(id)) {
              return;
            }
            js=d.createElement(s);
            js.id=id;
            js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";

            stags.parentNode.insertBefore(js,stags);
          }) (document,"script","imdb-rating-api");
    }

    function trailer_modal(url) {
        // Trailer Modal Popup

        // Gets the video src from the data-src on each button
        var $videoSrc = url
        console.log($videoSrc);


        // when the modal is opened autoplay it
        $('#trailer_modal').on('shown.bs.modal', function (e) {

        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
        $("#video").attr('src',$videoSrc + "?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;autoplay=1" );
        })


        // stop playing the youtube video when I close the modal
        $('#trailer_modal').on('hide.bs.modal', function (e) {
            // a poor man's stop video
            $("#video").attr('src',$videoSrc);
        })
    }
});
