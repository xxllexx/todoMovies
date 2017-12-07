import {compose, withHandlers, withState, setStatic} from 'recompose';
import {Animated} from 'react-native';
import {getMovie} from '../services/themoviedb';
import {addMoviesToStorage} from '../services/realm';

import navigation from '../utils/navigationHOC';
import {Movie} from '../components/Movie';
import Colors from '../uilib/style/colors';

const navigatorStyle = {
  tabBarHidden: true,
  drawUnderNavBar: true,
  navBarTranslucent: true,
  screenBackgroundColor: Colors.dark10,
  navBarHidden: true
};

export default compose(
  setStatic('navigatorStyle', navigatorStyle),
  withState('movie', 'setMovie', null),
  withState('scrollY', 'setScrolY', new Animated.Value(0)),
  withState('isLoading', 'setLoadingStatus', false),
  navigation({
    didAppear: async(comp, event, {id, setMovie}) => {
      const res = await getMovie({id});
      setMovie(res);
    }
  }),
  withHandlers({
    onBackPress: ({navigator}) => () => navigator.pop(),
    onPlusPress: ({navigator, setLoadingStatus, movie}) => async () => {
      setLoadingStatus(true);
      await addMoviesToStorage({
        title: movie.info.title,
        image: movie.info.poster_path,
        releaseDate: movie.info.release_date,
        movieId: movie.info.id
      });
      navigator.pop();
    }
  })
)(Movie)