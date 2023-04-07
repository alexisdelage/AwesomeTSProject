/**
 * @format
 */

import 'react-native';
import React from 'react';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import nock from 'nock';

import App from '../App';
import tolkienData from './mock-data/tolkien.json';
import verneData from './mock-data/verne.json';

it('renders correctly', async () => {
  // the query client
  const queryClient = new QueryClient();
  // replace the api call by mock data
  const scope = nock('https://openlibrary.org')
    .get('/search.json')
    .query(true)
    .reply(200, tolkienData);
  // try to render the component
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
  // wait data is loaded
  await waitFor(() => scope.done());
});

it('can update query', async () => {
  // the query client
  const queryClient = new QueryClient();
  // replace the api call by mock data
  nock('https://openlibrary.org')
    .get('/search.json')
    .query((params: Record<string, string>) => !params.q)
    .reply(200, tolkienData);
  nock('https://openlibrary.org')
    .get('/search.json')
    .query((params: Record<string, string>) => params.q === 'J.R.R. Tolkien')
    .reply(200, tolkienData);
  nock('https://openlibrary.org')
    .get('/search.json')
    .query((params: Record<string, string>) => params.q === 'Jules Verne')
    .reply(200, verneData);
  // default check
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
  // first query
  fireEvent.changeText(screen.getByTestId('queryInput'), 'J.R.R. Tolkien');
  expect(await screen.findByText('The Silmarillion')).toBeTruthy();
  // second query
  fireEvent.changeText(screen.getByTestId('queryInput'), 'Jules Verne');
  expect(
    await screen.findByText('Vingt mille lieues sous les mers'),
  ).toBeTruthy();
});
