import 'react-native';
import React from 'react';
import Card from './card';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Card title="Some sort of property"
          uri="https://lid.zoocdn.com/645/430/14b6a430b76a235e8de2ba02d695e7a0bd789b40.jpg"
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
