import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface Book {
  title: string;
  key: string;
  author_name?: string[];
}

interface BookListItemProps {
  book: Book;
}

/** A component to display a book in a list */
function BookListItem(props: BookListItemProps) {
  const {book} = props;

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
    margin: 10,
    marginLeft: 20,
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
