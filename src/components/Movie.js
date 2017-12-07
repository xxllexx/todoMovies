import _ from 'lodash/fp';
import {compose, branch, renderComponent} from 'recompose'
import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView, Animated} from 'react-native';
import {ImageGallery} from './ImageGallery';
import {DetailsBlock} from './DetailsBlock';
import {AbsolutePreloader} from './AbsolutePreloader';
import {View, Text, Image, BackButton, PlusButton} from '../uilib'
import Colors from '../uilib/style/colors';

const EmptyMovie = (props) => (
  <View flex center paddingH-20>
    <Text text30 white center>{props.title || 'Movie'}</Text>
  </View>
);

const MovieComponent = ({movie, ...props}) => {
  console.log(props.scrollY);
  return (
    <View flex>
      <View style={styles.imageHolder}>
        <Animated.Image style={[styles.headerImage, {
          opacity: props.scrollY.interpolate({
            inputRange: [0, 250],
            outputRange: [1, 0]
          }),
          transform: [{
            scale: props.scrollY.interpolate({
              inputRange: [-200, 0, 1],
              outputRange: [1.4, 1, 1]
            })
          }]
        }]} source={{uri: `https://image.tmdb.org/t/p/w500${movie.info.poster_path}`}}/>
      </View>
      <Animated.ScrollView
        style={styles.scrollView}
        scrollEventThrottle={10}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { y: props.scrollY } }
          }], {useNativeDriver: true})
        }
      >
        <View style={styles.contentView}>
          <Text dark70 text80>{movie.info.release_date.replace(/-/g, '/')} • {movie.runtime}min</Text>
          <Text white text30 numberOfLines={1}>{movie.info.title}</Text>
          <View marginT-20 marginB-20>
            <Text white text80>{movie.info.overview}</Text>
          </View>
          <ImageGallery images={_.take(10, movie.images.backdrops)}/>
          <DetailsBlock data={movie.info}/>
        </View>
      </Animated.ScrollView>
      <View style={styles.topBar}>
        <BackButton onPress={props.onBackPress}/>
        <PlusButton onPress={props.onPlusPress}/>
      </View>
      <AbsolutePreloader isShown={props.isLoading}/>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 32,
    left: 16,
    right: 16,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  imageHolder: {
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%'
  },
  headerImage: {
    width: 500,
    height: 750,
    resizeMode: 'contain'
  },
  scrollView: {},
  contentView: {
    marginTop: 500,
    padding: 20,
    backgroundColor: Colors.dark10,
    flexDirection: 'column'
  },
  controlBar: {
    height: 40
  }
});

const ifMovie = isMovie =>
  branch(
    isMovie,
    renderComponent(EmptyMovie)
  );

export const Movie = compose(
  ifMovie(props => !props.movie)
)(MovieComponent)



