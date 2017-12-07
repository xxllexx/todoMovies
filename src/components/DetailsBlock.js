import _ from 'lodash/fp';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from '../uilib';

import Colors from '../uilib/style/colors';

export const Line = ({title, value, inverted}) => (
    <View row style={styles.row}>
        <Text dark70={!inverted} dark10={inverted} text80>{title}</Text>
        <Text dark70={!inverted} dark10={inverted} text80>{value}</Text>
    </View>
);

export const DetailsBlock = ({data}) => (  
    <View marginT-20>
        <Line title={'Genres'} value={_.take(2, data.genres).map(g => g.name).join(', ')}/>
    </View>
);


const styles = StyleSheet.create({
    row: {
        padding: 20,
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.dark30
    }
})