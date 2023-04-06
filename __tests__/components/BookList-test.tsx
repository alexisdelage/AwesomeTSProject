import React from 'react';
import renderer from 'react-test-renderer';
import BookList from '../../src/components/BookList';

import data from '../../data.json';

it('renders correctly', () => {
  const tree = renderer.create(<BookList data={data.docs} />).toJSON();
  expect(tree).toMatchSnapshot();
});
