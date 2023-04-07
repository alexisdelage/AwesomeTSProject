import React, {useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';

import BookListItem from './BookListItem';
import {Book, Page} from '../../types';
import * as styleConstants from '../../styles';

function BookList() {
  const [author, _] = useState('William Shakespeare');

  const bookQuery = useQuery<Page<Book>, AxiosError>({
    queryKey: ['book-list', author],
    queryFn: () =>
      axios
        .get<Page<Book>>('https://openlibrary.org/search.json', {
          params: {
            author: author,
            fields: ['title', 'key', 'author_name'],
            limit: 50,
            offset: 0,
          },
        })
        .then(res => res.data),
  });

  if (bookQuery.isLoading) {
    return <Text style={styles.textMessage}>Loading...</Text>;
  }

  if (bookQuery.isError) {
    return (
      <Text style={styles.textMessage}>
        An error occurred: {bookQuery.error.message}
      </Text>
    );
  }

  if (bookQuery.data.docs.length === 0) {
    return <Text style={styles.textMessage}>No results</Text>;
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={bookQuery.data.docs}
      renderItem={item => <BookListItem book={item.item} />}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: styleConstants.md,
  },
  textMessage: {
    margin: styleConstants.md,
  },
});

export default BookList;
