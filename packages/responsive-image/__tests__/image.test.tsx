import * as React from 'react';
import { ImageBackground, Image } from 'react-native';
import { act, create } from 'react-test-renderer';
import ResponsiveImage from '../src';

const testUri = 'http://foo.com/bar.png';

jest.useFakeTimers();

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
    jest.runAllImmediates();
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
  const oldGetSize = Image.getSize;
  Image.getSize = (
    _: string,
    __: (width: number, height: number) => void,
    failure: (error: any) => void
  ) => failure('error');

  const onError = jest.fn();

  const component = create(<ResponsiveImage uri={testUri} onError={onError} />);

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

  Image.getSize = oldGetSize;

  expect(onError).toHaveBeenCalledTimes(2);
});
