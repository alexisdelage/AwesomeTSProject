import 'react-native';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import nock from 'nock';

import BookList from '../../src/components/BookList';
import data from '../mock-data/tolkien.json';

it('renders correctly', async () => {
  // the query client
  const queryClient = new QueryClient();
  // replace the api call by mock data
  const scope = nock('https://openlibrary.org')
    .get('/search.json')
    .query(true)
    .reply(200, data);
  // try to render the component
  render(
    <QueryClientProvider client={queryClient}>
      <BookList query="J.R.R. Tolkien" />
    </QueryClientProvider>,
  );
  // wait data is loaded
  await waitFor(() => scope.done());
  // check that the component did not change
  expect(screen.toJSON()).toMatchSnapshot();
});
