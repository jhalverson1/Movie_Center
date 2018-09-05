$(document).ready(function() {
  var api_key = config.TMDB_API;
  var baseimg_w185 = "https://image.tmdb.org/t/p/w185";
  var baseimg_original = "https://image.tmdb.org/t/p/original";
  var tmdb = theMovieDb;


  // Number of pages as input
  load_movies(4, "now_playing");
  load_movies(4, "popular");
  load_movies(4, "top_rated");


  // Function is called when movies successfully loaded
  function successCB(data) {
      // Object created from json
      var resultJSON = JSON.parse(data);
      console.log(resultJSON.results);
      load_carousel(resultJSON.results)
  };


  // Function is called when movies are not successfully loaded
  function errorCB(data) {
      console.log("Error callback: " + data);
  };


  // Netflix style carousel
  function load_carousel(movies, category) {

    if (category == "now_playing")
    {
      Object.keys(movies).forEach(function(index) {
          var current_id = movies[index].id;

          // Cronstruct full image path
          var full_path;
          if (movies[index].poster_path) {
            full_path = baseimg_w185 + movies[index].poster_path;
          } else {
            full_path = "images/poster_unavailable.jpg";
          }

          $('#now_playing_div').append(
            "<div class='list-group-item'>      \
                <a href='movie_info.html' class='list-group-item list-group-item-action search_result_item' id ='" + current_id + "' onClick='segue_click(this.id)'> \
                <img class='rounded item_img' src='" + full_path + "'>    \
            <div>"
          );
      });
    }
    else if (category == "popular")
    {
      Object.keys(movies).forEach(function(index) {
          var current_id = movies[index].id;

          // Cronstruct full image path
          var full_path;
          if (movies[index].poster_path) {
            full_path = baseimg_w185 + movies[index].poster_path;
          } else {
            full_path = "images/poster_unavailable.jpg";
          }

          $('#popular_div').append(
            "<div class='list-group-item'>      \
                <a href='movie_info.html' class='list-group-item list-group-item-action search_result_item' id ='" + current_id + "' onClick='segue_click(this.id)'> \
                <img class='rounded item_img' src='" + full_path + "'>    \
            <div>"
          );
      });
    }
    else if (category == "top_rated")
    {
      Object.keys(movies).forEach(function(index) {
          var current_id = movies[index].id;

          // Cronstruct full image path
          var full_path;
          if (movies[index].poster_path) {
            full_path = baseimg_w185 + movies[index].poster_path;
          } else {
            full_path = "images/poster_unavailable.jpg";
          }

          $('#top_rated_div').append(
            "<div class='list-group-item'>      \
                <a href='movie_info.html' class='list-group-item list-group-item-action search_result_item' id ='" + current_id + "' onClick='segue_click(this.id)'> \
                <img class='rounded item_img' src='" + full_path + "'>    \
            <div>"
          );
      });
    }


  }

  // Load list of now_playing movies
  function load_movies(pages, category) {

    if (category == "now_playing")
    {
      var current_page = 1;

      while (current_page <= pages) {
        tmdb.movies.getNowPlaying({"region": "US", "page": current_page}, function(data) {
          // Object created from json
          var resultJSON = JSON.parse(data);
          load_carousel(resultJSON.results, category)
        }, errorCB)

        current_page++;
      }
    }
    else if (category == "popular")
    {

      var current_page = 1;

      while (current_page <= pages) {
        tmdb.movies.getPopular({"region": "US", "page": current_page}, function(data) {
          // Object created from json
          var resultJSON = JSON.parse(data);
          load_carousel(resultJSON.results, category)
        }, errorCB)

        current_page++;
      }
    }
    else if (category == "top_rated")
    {

      var current_page = 1;

      while (current_page <= pages) {
        tmdb.movies.getTopRated({"region": "US", "page": current_page}, function(data) {
          // Object created from json
          var resultJSON = JSON.parse(data);
          load_carousel(resultJSON.results, category)
        }, errorCB)

        current_page++;
      }
    }
  }

});

function segue_click(clicked_id) {
    console.log("segue");
    // save clicked movie id to local storage for later use
    localStorage.movie_id=clicked_id;

};
