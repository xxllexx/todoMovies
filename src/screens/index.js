import {Navigation} from 'react-native-navigation';
import DiscoverScreen from './Discover';
import ToWatchScreen from './ToWatch';
import SearchMovieScreen from './SearchMovie';
import MovieScreen from './Movie';
import WatchList from './WatchList';

export function registerScreens() {
  Navigation.registerComponent('todoMovies.DiscoverScreen', () => DiscoverScreen);
  Navigation.registerComponent('todoMovies.ToWatchScreen', () => ToWatchScreen);
  Navigation.registerComponent('todoMovies.SearchMovieScreen', () => SearchMovieScreen);
  Navigation.registerComponent('todoMovies.MovieScreen', () => MovieScreen);
  Navigation.registerComponent('todoMovies.WatchList', () => WatchList);
}