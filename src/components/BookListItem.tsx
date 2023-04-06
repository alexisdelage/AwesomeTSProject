import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import * as styleConstants from '../../styles';
import {Book} from '../../types';

interface BookListItemProps {
  book: Book;
}

function BookListItem({book}: BookListItemProps) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{book.title}</Text>
      <Text style={styles.itemDescription}>
        {book.author_name?.join(', ') || 'No authors'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: styleConstants.md,
    marginTop: 0,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: 'black',
  },
  itemDescription: {
    color: 'grey',
  },
});

export default BookListItem;
