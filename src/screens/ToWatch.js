import {compose, withHandlers, mapProps} from 'recompose';
import LoaderComponent from '../containers/LoaderComponent';
import {ToWatchComponent} from '../components/ToWatch';
import connectRealm from '../utils/connectRealm';
import {getRealm} from '../services/realm';

export default compose(
  connectRealm(
    getRealm('Movie'),
    (entities, ownProps) => ({
      movies: entities.filtered('watched = false').sorted('timeAdded', true),
      watched: entities.filtered('watched = true').sorted('timeAdded', true)
    })
  ),
  mapProps(({movies, watched, navigator}) => ({
    moviesAmount: movies.length,
    watchedAmount: watched.length,
    navigator
  })),
  withHandlers({
    openToWatch: ({navigator, moviesAmount}) => () => {
      moviesAmount && navigator.push({
        screen: 'todoMovies.WatchList',
        passProps: {
          isWatched: false
        }
      })
    },
    openWatched: ({navigator, watchedAmount}) => () => {
      watchedAmount && navigator.push({
        screen: 'todoMovies.WatchList',
        passProps: {
          isWatched: true
        }
      })
    }
  }),
  LoaderComponent
)(ToWatchComponent)