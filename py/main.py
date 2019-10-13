#!/usr/bin/env python3
from config import *
import tmdbsimple as tmdb

tmdb.API_KEY = tmdb_key

movie = tmdb.Movies(603)
print(movie.info())