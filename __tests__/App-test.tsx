/**
 * @format
 */

import 'react-native';
import React from 'react';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {render, waitFor} from '@testing-library/react-native';
import nock from 'nock';

import App from '../App';
import data from '../data.json';

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
      <App />
    </QueryClientProvider>,
  );
  // wait data is loaded
  await waitFor(() => scope.done());
});
