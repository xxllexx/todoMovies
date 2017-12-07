import {compose, withHandlers, withProps} from 'recompose';
import {connect} from 'remx';
import {getters as MoviesListStore} from '../store/moviesListStore';
import {loadMoreMovies} from '../actions/app';
import LoaderComponent from '../containers/LoaderComponent';
import {DiscoverComponent} from '../components/Discover';

const mapStateToProps = () => ({
  moviesListIds: MoviesListStore.getMoviesListIds(),
  isMoviesLoading: MoviesListStore.getLoadingStatus()
});

export default compose(
  connect(mapStateToProps),
  withProps(props => ({
    movieList: props.moviesListIds.map(i => MoviesListStore.getMovie(i))
  })),
  withHandlers({
    loadMore: (props) => () => {
      !props.isMoviesLoading && loadMoreMovies();
    },
    onItemPress: ({navigator}) => (movieEnity) => {
      navigator.push({
        screen: 'todoMovies.MovieScreen',
        passProps: {
          id: movieEnity.id,
          title: movieEnity.title
        }
      })
    }
  }),
  LoaderComponent,
)(DiscoverComponent)