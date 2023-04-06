import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import BookListItem from './BookListItem';
import {Book} from '../../types';

interface BookListProps {
  data: Book[];
}

/** component to display a Book List */
function BookList(props: BookListProps) {
  const {data} = props;

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={data}
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
