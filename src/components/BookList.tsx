import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import BookListItem from './BookListItem';
import data from '../../data.json';

/** component to display a Book List */
function BookList() {
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={data.docs}
      renderItem={item => <BookListItem book={item.item} />}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 20,
  },
});

export default BookList;
