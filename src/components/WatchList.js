import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {ListItem} from '../uilib';
import {SwipeActionView} from 'react-native-action-view';
import Colors from '../uilib/style/colors';

export const WatchListComponent = ({movieList, onItemPress, isWatched, changeWatchStatus, deleteFromList}) => {
  return (  
      <FlatList
        data={movieList}
        keyExtractor={(item, index) => `ll_${index}`}
        renderItem={({item}) => (
          <SwipeActionView rightExpansionSettings={{buttonIndex: 0}} leftExpansionSettings={{buttonIndex: 0}} rightButtons={[
            {title: isWatched ? 'Unwatch' : 'Watched', color: Colors.blue30, callback: () => changeWatchStatus(item.movieId)}
          ]}
          leftButtons={[
            {title: 'Delete', color: Colors.red30, callback: () => deleteFromList(item.movieId)}
          ]}>
            <ListItem 
              title={item.title} 
              subtitle={item.releaseDate}
              image={`https://image.tmdb.org/t/p/w185${item.image}`}
              accessory={true}
              onPress={() => { onItemPress(item) }}
            />
          </SwipeActionView>
        )}
      />
  );
};

WatchListComponent.propTypes = {
  movieList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onItemPress: PropTypes.func,
  isWatched: PropTypes.bool,
  changeWatchStatus: PropTypes.func.isRequired,
  deleteFromList: PropTypes.func.isRequired
};