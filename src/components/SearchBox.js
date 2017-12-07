import _ from 'lodash/fp';
import React, {Component} from 'react';
import {compose, withState, withHandlers} from 'recompose';
import {TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text} from '../uilib';

const SearchBox = props => (
    <View style={styles.inputHolder} row>
        <TextInput
            placeholder={'Search'}
            onChangeText={props.changeText}
            value={props.searchValue}
            style={styles.input}
            autoFocus={props.autoFocus}
        />
        {props.notEmpty ? (
            <TouchableOpacity style={styles.clearButton} onPress={props.clearSearch}>
                <Text blue30 text80>Clear</Text>
            </TouchableOpacity>
        )  : null}
    </View>
);

export default compose(
    withState('notEmpty', 'setEmptyStatus', false),
    withState('searchValue', 'setSearchValue', ''),
    withHandlers({
        changeText: (props) => (text) => {
            props.setEmptyStatus(!_.isEmpty(text));
            props.onSearchTextChanged && props.onSearchTextChanged(text);
            props.setSearchValue(text);
        },
        clearSearch: (props) => () => {
            props.setEmptyStatus(false);
            props.setSearchValue('');
            props.onSearchTextChanged && props.onSearchTextChanged('');
        }
    })
)(SearchBox);

const styles = StyleSheet.create({
  inputHolder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    paddingTop: 40,
    marginBottom: 10,
    width: '100%'
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 24,
    paddingHorizontal: 15,
  },
  clearButton: {
    height: 40,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
})