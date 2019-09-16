import * as React from 'react';
import { act, create } from 'react-test-renderer';
import Image from '..';

const testUri = 'http://foo.com/bar.png';

jest.useFakeTimers();

test('Image renders', async () => {
  const component = create(
    <Image source={{ uri: testUri }} width={100} height={150} />
  );
  await act(async () => {
    jest.runAllImmediates();
  });
  const tree = component.toJSON();
  expect(tree.props.style[1].height).toEqual(150);
  expect(tree.props.style[1].width).toEqual(100);
  expect(tree).toMatchSnapshot();
});

test('Image calculates height', async () => {
  const component = create(
    <Image source={{ uri: testUri }} width={100} aspectRatio={1.5} />
  );
  await act(async () => {
    jest.runAllImmediates();
  });
  const tree = component.toJSON();
  expect(tree.props.style[1].height).toEqual(150);
  expect(tree.props.style[1].width).toEqual(100);
  expect(tree).toMatchSnapshot();
});

test('Image calculates width', async () => {
  const component = create(
    <Image source={{ uri: testUri }} height={150} aspectRatio={1.5} />
  );
  await act(async () => {
    jest.runAllImmediates();
  });
  const tree = component.toJSON();
  expect(tree.props.style[1].height).toEqual(150);
  expect(tree.props.style[1].width).toEqual(100);
  expect(tree).toMatchSnapshot();
});
