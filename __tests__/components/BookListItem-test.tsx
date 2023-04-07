import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BookListItem from '../../src/components/BookListItem';
import data from '../mock-data/tolkien.json';

it('renders correctly', () => {
  const tree = renderer.create(<BookListItem book={data.docs[0]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
