$(document).ready(function(){

    var api_key = config.TMDB_API;
    var baseimg = "https://image.tmdb.org/t/p/w300";
    var tmdb = theMovieDb;
    var resultJSON = {};

  // When the user searches for a movie
	 $("#search").click(function(){

        var film = $('#term').val();
        tmdb.search.getMovie({"query":film}, search_successCB, search_errorCB)

    });


    // Currently not used.
    function display(description, poster_path) {
        $('#description').text(description);
        document.getElementById("poster").src = baseimg + poster_path;
    };

    // Generates a list of movies based on what is being searched for
    function generate_list(resultJSON) {

        // Clear div, then load div with new search results
        $('#movie_list_div').empty();
        $('#movie_list_div').append("<div class='list-group' id='newResultsList'></div>");

        for (i = 0; i < resultJSON.results.length; i++) {
            console.log(resultJSON.results[i].id);
            var current_id = resultJSON.results[i].id;
            $("#newResultsList").append("<a href='movie_info.html' class='list-group-item list-group-item-action' id ='"
                        + current_id + "' onClick='segue_click(this.id)'>"
                        + resultJSON.results[i].title + ", "
                        + resultJSON.results[i].release_date.substring(0, 4)
                        + "</a>");

        }
    };

    // Function is called when the search is successful
    function search_successCB(data) {

        // Object created from json
        resultJSON = JSON.parse(data);

        generate_list(resultJSON)

        console.log("Success callback");
    };

    // Function is called when the search is not successful
    function search_errorCB(data) {
        console.log("Error callback: " + data);
    };


});

function segue_click(clicked_id) {

    // save clicked movie id to local storage for later use
    localStorage.movie_id=clicked_id;

};
