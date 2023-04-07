import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosError} from 'axios';

import BookListItem from './BookListItem';
import {Book, Page} from '../../types';
import * as styleConstants from '../../styles';

interface BookListProps {
  query: string;
}

function BookList({query}: BookListProps) {
  const debouncedQuery = useDebounce(query, 300);
  const bookQuery = useQuery<Page<Book>, AxiosError>({
    queryKey: ['book-list', debouncedQuery],
    queryFn: () =>
      axios
        .get<Page<Book>>('https://openlibrary.org/search.json', {
          params: {
            q: debouncedQuery,
            fields: ['title', 'key', 'author_name'],
            limit: 50,
            offset: 0,
          },
        })
        .then(res => res.data),
  });

  if (bookQuery.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMessage: {
    margin: styleConstants.md,
  },
});

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default BookList;
