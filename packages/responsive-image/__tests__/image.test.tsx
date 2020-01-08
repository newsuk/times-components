import * as React from 'react';
import { Image, ImageBackground } from 'react-native';
import { act, create } from 'react-test-renderer';
import ResponsiveImage from '../src';

const testUri = 'http://foo.com/bar.png';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('Image renders', async () => {
  const component = create(<ResponsiveImage uri={testUri} />);
  expect(component).toMatchSnapshot();
});

test('Image respects resizeMode', async () => {
  const component = create(
    <ResponsiveImage uri={testUri} resizeMode="cover" />
  );
  expect(component).toMatchSnapshot();
});

test('Image handles no uri', async () => {
  const component = create(<ResponsiveImage uri={''} />);
  expect(component).toMatchSnapshot();
});

test('Image loads high-res', async () => {
  const component = create(<ResponsiveImage uri={testUri} />);

  const image = component.root.findByType(ImageBackground);
  image.props.onLayout({
    nativeEvent: {
      layout: {
        width: 500
      }
    }
  });
  await act(async () => {
    await jest.runAllImmediates();
  });
  const images = component.root.findAllByType(Image);
  images.forEach(img => 'onLoadEnd' in img.props && img.props.onLoadEnd());
  await act(async () => {
    await jest.runAllImmediates();
  });
  expect(component).toMatchSnapshot();
});

test('Image calls onlayout', async () => {
  const onLayout = jest.fn();
  const component = create(
    <ResponsiveImage uri={testUri} onLayout={onLayout} />
  );
  const image = component.root.findByType(ImageBackground);
  image.props.onLayout({
    nativeEvent: {
      layout: {
        width: 500
      }
    }
  });
  await act(async () => {
    jest.runAllImmediates();
  });
  expect(onLayout).toBeCalledTimes(1);
});

test('Image gracefully handles bad high-res url', async () => {
  const onError = jest.fn();

  const component = create(<ResponsiveImage uri={testUri} onError={onError} />);

  await act(async () => {
    await jest.runAllImmediates();
  });

  const images = component.root.findAllByType(Image);
  images.forEach(image => 'onError' in image.props && image.props.onError());

  expect(component).toMatchSnapshot();
});
