$(document).ready(function(){

    var api_key = config.TMDB_API;
    var baseimg = "https://image.tmdb.org/t/p/w300";
    var tmdb = theMovieDb;
    var resultJSON = {};

	$("#search").click(function(){

        var film = $('#term').val();
        tmdb.search.getMovie({"query":film}, search_successCB, search_errorCB)

    });

    $(document).on('click', '.details_segue', function( event ) {
        //Do Code here

        alert( $(this).attr('id') );
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
        $('#movie_list_div').append("<ul id='newResultsList'></ul>");

        for (i = 0; i < resultJSON.results.length; i++) {
            $("#newResultsList").append("<li> Title: "
                        + resultJSON.results[i].title + " , Year: "
                        + resultJSON.results[i].release_date.substring(0, 4)
                        + "</li>");

        }
    };

    // Function is called when the search is successful
    function search_successCB(data) {

        // Object created from json
        resultJSON = JSON.parse(data);

        generate_list(resultJSON)

        console.log("Success callback");
    };

    // Function is calle when the search is not successful
    function search_errorCB(data) {
        console.log("Error callback: " + data);
    };


});
