$(document).ready(function() {
  var api_key = config.TMDB_API;
  var baseimg = "https://image.tmdb.org/t/p/w300";
  var tmdb = theMovieDb;


  // Number of pages as input
  load_popular_movies(5);

  function load_popular_movies(pages) {

    var current_page = 1;

    while (current_page <= pages) {
      console.log("page: " + current_page);
      tmdb.movies.getNowPlaying({"region": "US", "page": current_page}, successCB, errorCB)

      current_page++;
    }


  }
  // Function is called when movies successfully loaded
  function successCB(data) {

      // Object created from json
      var resultJSON = JSON.parse(data);
      generate_list(resultJSON.results)
  };

  // Function is called when movies are not successfully loaded
  function errorCB(data) {
      console.log("Error callback: " + data);
  };

  function generate_list(movies) {

    for (i = 0; i < movies.length; i++) {
      console.log("Movie: " + movies[i]);
      // Check and see if movie has a poster poster available
      var full_image_url;
      if (movies[i].poster_path) {
        full_image_url = baseimg + movies[i].poster_path;
      } else {
        full_image_url = "images/poster_unavailable.jpg";
      }

      $("#movie_display_div").append(
        "<div class='col-lg-2'>                                             \
            <img class='poster_thumbnail' src='" + full_image_url + "' alt='movie poster'> \
            <div>" + movies[i].title + "</div>                              \
        </div>"
      )
    }
  }
});
