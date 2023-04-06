import React, {useState} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';

import BookListItem from './BookListItem';
import {Book, Page} from '../../types';
import * as styleConstants from '../../styles';

/** component to display a Book List */
function BookList() {
  const [author, _] = useState('Jules Verne');

  const {isLoading, isError, data, error} = useQuery<
    AxiosResponse<Page<Book>, any>,
    AxiosError
  >({
    queryKey: ['book-list', author],
    queryFn: () =>
      axios.get('https://openlibrary.org/search.json', {
        params: {
          author: author,
          fields: ['title', 'key', 'author_name'],
          limit: 50,
          offset: 0,
        },
      }),
  });

  if (isLoading) {
    return <Text style={styles.textMessage}>Loading...</Text>;
  }

  if (isError) {
    return (
      <Text style={styles.textMessage}>An error occurred: {error.message}</Text>
    );
  }

  if (data.data.docs.length === 0) {
    return <Text style={styles.textMessage}>No results</Text>;
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={data.data.docs}
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
