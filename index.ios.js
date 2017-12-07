import { Navigation } from 'react-native-navigation';
import {registerScreens, DiscoverScreenName} from './src/screens';
import {initialLoad} from './src/actions/app';

registerScreens();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'To Watch',
      screen: 'todoMovies.ToWatchScreen',
      title: 'To Watch Movies'
    },
    {
      label: 'Discover',
      screen: 'todoMovies.DiscoverScreen',
      title: 'Discover Movies'
    },
    {
      label: 'Search',
      screen: 'todoMovies.SearchMovieScreen',
      title: 'Search Movies'
    }
  ]
});

initialLoad();

console.disableYellowBox = true;