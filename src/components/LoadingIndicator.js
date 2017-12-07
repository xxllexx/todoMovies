import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {View} from '../uilib';

export const LoadingIndicator = ({isShown}) => (
    <View flex center marginT-20 marginB-20>
        <ActivityIndicator animating />
    </View>
);

LoadingIndicator.propTypes = {};

