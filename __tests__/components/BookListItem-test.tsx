import React from 'react';
import renderer from 'react-test-renderer';
import BookListItem from '../../src/components/BookListItem';
import data from '../../data.json';

it('renders correctly', () => {
  const tree = renderer.create(<BookListItem book={data.docs[0]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
