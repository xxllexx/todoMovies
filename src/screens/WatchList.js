import {compose, withHandlers} from 'recompose';
import {WatchListComponent} from '../components/WatchList';
import {changeMovieWatchedStatus, deleteMovie} from '../services/realm';

import connectRealm from '../utils/connectRealm';

import {getRealm} from '../services/realm';

export default compose(
  connectRealm(
    getRealm('Movie'),
    (entities, ownProps) => ({
      movieList: entities.filtered(`watched = ${Boolean(ownProps.isWatched)}`).sorted('timeAdded', true)
    })
  ),
  withHandlers({
    changeWatchStatus: ({navigator, isWatched, movieList}) =>
      (id) => {
        (movieList.length === 1) && navigator.pop();
        changeMovieWatchedStatus({id, isWatched: !isWatched});
      },

    deleteFromList: ({navigator, movieList}) => (id) => {
      (movieList.length === 1) && navigator.pop();
      deleteMovie({id});
    },
    onItemPress: ({navigator}) => (movieEnity) => {
      navigator.push({
        screen: 'todoMovies.MovieScreen',
        passProps: {
          id: movieEnity.movieId,
          title: movieEnity.title
        }
      })
    }
  })
)(WatchListComponent)