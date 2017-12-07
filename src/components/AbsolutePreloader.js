import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

export const AbsolutePreloader = ({isShown, isScreen}) => (
  (isShown === undefined) || !!isShown ? (
      <View style={isScreen ? styles.screenPreloader : styles.absolutePreloader}>
        <ActivityIndicator size="large" style={styles.activityBg}/>
      </View>
    ) : null
);

AbsolutePreloader.propTypes = {
  isShown: PropTypes.bool,
  isScreen: PropTypes.bool
};

const styles = StyleSheet.create({
  absolutePreloader: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ffffff',
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenPreloader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  activityBg: {
    backgroundColor: 'transparent'
  }
});