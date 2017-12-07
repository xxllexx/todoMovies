import {getMovieList} from '../services/themoviedb';

import {setters as appStore} from '../store/appStore';
import * as MoviesListStore from '../store/moviesListStore';

export const initialLoad = async () => {
  await loadMoreMovies();
  appStore.setAppStatus(true);
};

export const loadMoreMovies = async() => {

  MoviesListStore.setters.setLoadingStatus(true);
  let moviesList = await getMovieList({page: MoviesListStore.getters.getNextPage()});

  if ('results' in moviesList) {
    MoviesListStore.setters.addMoviesToList(moviesList.results);
    MoviesListStore.setters.setNextPage();
  }
  MoviesListStore.setters.setLoadingStatus(false);
};