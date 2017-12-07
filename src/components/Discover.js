import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {ListItem, View, Text} from '../uilib';
import {LoadingIndicator} from './LoadingIndicator'

export const DiscoverComponent = ({movieList, loadMore, isMoviesLoading, onItemPress = () => {}}) => (  
    <FlatList
      data={movieList}
      keyExtractor={(item, index) => `ll_${index}`}
      renderItem={({item}) => (
        <ListItem 
          title={item.title} 
          subtitle={item.release_date}
          image={`https://image.tmdb.org/t/p/w185${item.poster_path || item.image}`}
          accessory={true}
          onPress={() => { onItemPress(item) }}
          />
      )}
      onEndReachedThreshold={2}
      onEndReached={loadMore}
      ListFooterComponent={<LoadingIndicator isShown={isMoviesLoading}/>}
    />
);
