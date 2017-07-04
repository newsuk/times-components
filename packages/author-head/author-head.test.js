import 'react-native';
import React from 'react';
import AuthorHead from './author-head';
import renderer from 'react-test-renderer';

it('renders a snapshot', () => {
  const tree = renderer.create(<AuthorHead />).toJSON();
  expect(tree).toMatchSnapshot();
});
