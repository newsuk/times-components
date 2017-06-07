import 'react-native';
import React from 'react';
import Author from './author';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Author />
  ).toJSON();

  expect(tree).to.exist;
});
