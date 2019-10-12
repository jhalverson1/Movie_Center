$(document).ready(function(){


    var api_key = config.TMDB_API;
    var baseimg = "https://image.tmdb.org/t/p/w185";
    var tmdb = theMovieDb;
    var resultJSON = {};
    var database = firebase.database();

    // firebase.database().ref("search_count").set({
    //   "loaded": 0
    // });

    // Allows user to hit enter in text box to submit search
   document.getElementById('movie_search_text').onkeypress=function(e){
      if(e.keyCode==13){
        document.getElementById('movie_search_btn').click();
      }
    }

  // When the user searches for a movie
	 $("#movie_search_btn").click(function(){
        var film = $('#movie_search_text').val();
        tmdb.search.getMovie({"query":film}, search_successCB, search_errorCB)
    });

    // Generates a list of movies based on what is being searched for
    function generate_list(resultJSON) {

        // Clear div, then load div with new search results
        $('#movie_list_div').empty();
        $('#movie_list_div').append("<div class='list-group' id='newResultsList'></div>");

        for (i = 0; i < resultJSON.results.length; i++) {
            var current_id = resultJSON.results[i].id;
            // Check and see if movie has a poster poster available
            var full_image_url;
            if (resultJSON.results[i].poster_path) {
              full_image_url = baseimg + resultJSON.results[i].poster_path;
            } else {
              full_image_url = "images/poster_unavailable.jpg";
            }

            // Create unordered list items
            $("#newResultsList").append(
                        "<a href='movie_info.html' class='list-group-item list-group-item-action search_result_item' id ='" + current_id + "' onClick='segue_click(this.id)'> \
                        <div class='container-fluid'> \
                          <div class='row'> \
                          \
                            <!-- Movie Poster --> \
                            <div class='col-sm-1 home_li_pic'> \
                              <img class='poster_thumbnail' src='" + full_image_url + "' alt='movie poster'> \
                            </div> \
                            \
                            <!-- title and release year --> \
                            <div class='col-sm-5'> \
                              <h3 class='title_header'>" + resultJSON.results[i].title + "</h3> \
                              <p class='year_text'>" + resultJSON.results[i].release_date.substring(0, 4) + "</p> \
                            </div> \
                            \
                            <!-- Unused Section --> \
                            <div class='col-sm-6'> \
                            </div> \
                          </div> \
                        </div>"
                      );
        }
    };

    function generate_filtered_list() {

      var filters = {"page": 1}

      // Assign 'Genre' Argument
      if (localStorage.genre_filter) {
        filters["with_genres"] = localStorage.genre_filter;
      }

      // Assign Release Date To and from
      if (localStorage.from_year) {
        filters["primary_release_date.gte"] = localStorage.from_year;
      }
      if (localStorage.to_year) {
        filters["primary_release_date.lte"] = localStorage.to_year;
      }

      var current_page = 1;


      tmdb.discover.getMovies(filters, function(data) {
        var resultJSON = JSON.parse(data);
        console.log(resultJSON);
        generate_list(resultJSON);
      },
      function(data) { console.log("Error callback: " + data); });
    }

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

    $('#advanced_search_link').click(function() {
      // Make filters visible
      var div_selector = document.getElementById('advanced_search_div');
      if (div_selector.style.display == "none") {
        console.log("BLOCK");
        div_selector.style.display = "block";
      } else {
        console.log("NONE");
        div_selector.style.display = "none";
      }
    });

    // Genre Filters
    $('#drama_genre_option').click( function() {
      localStorage.genre_filter="18";
      console.log("Drama");
      document.getElementById("dropdownMenuButton").innerText = "Drama";
    });

    $('#comedy_genre_option').click( function() {
      localStorage.genre_filter="35";
      document.getElementById("dropdownMenuButton").innerText = "Comedy";
    });

    $('#horror_genre_option').click( function() {
      localStorage.genre_filter="27";
      document.getElementById("dropdownMenuButton").innerText = "Horror";
    });

    $('#documentary_genre_option').click( function() {
      localStorage.genre_filter="99";
      document.getElementById("dropdownMenuButton").innerText = "Documentary";
    });

    $('#scifi_genre_option').click( function() {
      localStorage.genre_filter="878";
      document.getElementById("dropdownMenuButton").innerText = "SciFi";
    });

    $('#thriller_genre_option').click( function() {
      localStorage.genre_filter="53";
      document.getElementById("dropdownMenuButton").innerText = "Thriller";
    });

    $('#action_genre_option').click( function() {
      localStorage.genre_filter="28";
      document.getElementById("dropdownMenuButton").innerText = "Action";
    });

    $('#none_genre_option').click( function() {
      localStorage.genre_filter=undefined;
      document.getElementById("dropdownMenuButton").innerText = "Genre"
    })

    // Submit button
    $('#submit_btn').click( function() {

      // Collect Release Year Range
      if ($('#from_year_filter').val()) {
        var from_year = $('#from_year_filter').val();
        localStorage.from_year = from_year;
      } else {
        localStorage.from_year = "";
      }

      if ($('#to_year_filter').val()) {
        var to_year = $('#to_year_filter').val();
        localStorage.to_year = to_year;
      } else {
        localStorage.to_year = "";
      }

      generate_filtered_list();
    });





});

function segue_click(clicked_id) {

    // save clicked movie id to local storage for later use
    localStorage.movie_id=clicked_id;

    // save current url to local storage for later use
    localStorage.previous_page=window.location.href;

};
