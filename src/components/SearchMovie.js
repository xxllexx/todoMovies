import _ from 'lodash/fp';
import React, {Component} from 'react';
import {FlatList, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {ListItem, View, Text} from '../uilib';
import SearchBox from './SearchBox';
import {DiscoverComponent} from './Discover';
import {LoadingIndicator} from './LoadingIndicator'

export const SearchMovieComponent = props => (
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <SearchBox onSearchTextChanged={props.onSearch} autoFocus/>
    <View flex>
      {
        _.isEmpty(props.results) ? (
          <Text center text70 dark10>NO RESULTS</Text>
        ) : (
          <DiscoverComponent
            movieList={props.results}
            loadMore={props.loadMore}
            isMoviesLoading={props.isMoviesLoading}
            onItemPress={props.onItemPress}
          />
        )
      }
      
    </View>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: {flex: 1}
})