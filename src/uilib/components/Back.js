import React, {PureComponent} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Back = ({onPress, tintColor}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={require('../Assets/back/back.png')} style={styles.icon}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32
    }
});

export default Back;