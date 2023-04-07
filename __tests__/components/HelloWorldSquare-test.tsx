import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import HelloWorldSquare from '../../src/components/HelloWorldSquare';

it('renders correctly', () => {
  const tree = renderer.create(<HelloWorldSquare />).toJSON();
  expect(tree).toMatchSnapshot();
});
