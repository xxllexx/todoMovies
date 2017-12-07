import React, {Component, PropTypes} from 'react';
import {View, Text, Image} from '../';
import {TouchableOpacity, StyleSheet, Image as RNImage} from 'react-native'

import Colors from '../style/colors'

const picture = (props) => props.image ? (
    <View style={styles.imageContainer}>
        <Image
            style={styles.image}
            source={{uri: props.image}}
        />
    </View>
) : null;

const accessory = (props) => props.accessory ? (
        <View center style={styles.chevron}>
            <RNImage style={styles.icon} source={require('../Assets/chevron/chevron.png')}/>
        </View>
    ) : null;

const ListItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View row style={styles.container}>
                {picture(props)}
                <View row flex style={styles.centerHolder} center>
                    <View column flex style={styles.textContainer}>
                        <Text text60>{props.title}</Text>
                        {props.subtitle ? <Text text80 dark30 marginT-5>{props.subtitle}</Text> : null}
                    </View>
                    {accessory(props)}
                </View>
            </View>
        </TouchableOpacity>
    )
}

ListItem.propTypes = {}

export default ListItem;

const styles = StyleSheet.create({
    container: {
        
    },
    imageContainer: {width: 60, height: 60, marginLeft: 15, marginVertical: 15},
    image: {flex: 1, resizeMode: 'center'},
    centerHolder: {
        marginHorizontal: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.dark70
    },
    textContainer: {
        paddingVertical: 15
    },
    chevron: {
        // marginBottom: 15
    },
    icon: {
        tintColor: Colors.dark10
    }
});