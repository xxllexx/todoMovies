import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ListItem, View} from '../uilib';
import {TouchableOpacity} from 'react-native';

export const ToWatchComponent = ({moviesAmount, watchedAmount, openToWatch, openWatched}) => {
  return (
    <View>
      <ListItem
        title={'To Watch'} 
        subtitle={`in list: ${moviesAmount}`}
        accessory={Boolean(moviesAmount)}
        onPress={openToWatch}
      />
      <ListItem
        title={'Watched'} 
        subtitle={`in list: ${watchedAmount}`}
        accessory={Boolean(watchedAmount)}
        onPress={openWatched}
      />
    </View>
  )
};

ToWatchComponent.propTypes = {
  moviesAmount: PropTypes.number,
  watchedAmount: PropTypes.number,
  openToWatch: PropTypes.func,
  openWatched: PropTypes.func
};
