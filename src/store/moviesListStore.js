import * as remx from 'remx';

let moviesList = {};

const state = remx.state({
  page: 1,
  isLoading: false,
  moviesListIds: []
});

export const setters = remx.setters({
  addMoviesToList(movies) {
    moviesList = {
      ...moviesList,
      ...movies.reduce((a, b) => ({...a, [b.id]: b}), {})
    };

    state.moviesListIds = Object.keys(moviesList);
  },
  setNextPage() {
    state.page = state.page + 1
  },
  setLoadingStatus(isLoading) {
    state.isLoading = isLoading;
  }
});

export const getters = remx.getters({
  getMoviesListIds: () => state.moviesListIds,
  getMovie: (id) => moviesList[id],
  getNextPage: () => state.page,
  getLoadingStatus: () => state.isLoading
})