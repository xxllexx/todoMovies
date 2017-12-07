import _ from 'lodash/fp';
import {compose, setStatic, withHandlers, withState} from 'recompose';
import {SearchMovieComponent} from '../components/SearchMovie';
import {searchMovie} from '../services/themoviedb';

const navigatorStyle = {
  drawUnderNavBar: false,
  screenBackgroundColor: 'white',
  navBarHidden: true
};

export default compose(
  setStatic('navigatorStyle', navigatorStyle),
  withState('results', 'setResult', []),
  withState('page', 'setPage', 1),
  withState('isMoviesLoading', 'changeLoadingStatus', false),
  withState('searchQuery', 'setSearchQuery', ''),
  withHandlers({
    onSearch: (props) => _.debounce(300, async(searchText) => {
      props.setPage(1);
      if ((searchText || '').length >= 3) {
        props.changeLoadingStatus(true);
        props.setSearchQuery(searchText);
        let result = await searchMovie({searchText, page: props.page});
        props.setResult(_.get('results', result) || []);
        props.setPage(props.page + 1);
        props.changeLoadingStatus(false);
      }
    }),
    loadMore: (props) => async() => {
      if (_.isEmpty(props.searchQuery)) return;
      props.changeLoadingStatus(true);
      let result = await searchMovie({
        searchText: props.searchQuery,
        page: props.page + 1
      });
      props.setResult([
        ...props.results,
        ...(_.get('results', result) || [])
      ]);
      props.setPage(props.page + 1);
      props.changeLoadingStatus(false);
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
  })
)(SearchMovieComponent)