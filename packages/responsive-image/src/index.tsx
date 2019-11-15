import * as React from 'react';
import { Image, ImageBackground, ImageStyle, PixelRatio } from 'react-native';
import Url from 'url-parse';
import logoPath from '../assets/t.png';
import styles from './styles';

interface ResponsiveImageProps {
  readonly aspectRatio?: number;
  readonly onImagePress?: () => void;
  readonly caption?: JSX.Element;
  readonly uri: string;
  relativeHeight?: number;
  relativeHorizontalOffset?: number;
  relativeVerticalOffset?: number;
  relativeWidth?: number;
  resizeMode?: ImageStyle['resizeMode'];
  rounded?: boolean;
  style?: any;
  onLayout?: (ev: any) => {};
  onError?: () => {};
  disablePlaceholder?: boolean;
}

const ResponsiveImage = (props: ResponsiveImageProps) => {
  const {
    uri,
    aspectRatio,
    style: propStyle,
    relativeHeight = 1,
    relativeHorizontalOffset = 0,
    relativeVerticalOffset = 0,
    relativeWidth = 1,
    resizeMode,
    rounded,
    onLayout,
    onError,
    disablePlaceholder
  } = props;

  if (!uri) {
    return null;
  }
  const borderRadius = rounded ? 9999 : 0;

  const url: Url = new Url(uri, true);
  if (!uri.includes('data:')) {
    url.query.rel_width = Math.floor(relativeWidth).toString();
    url.query.rel_height = Math.floor(relativeHeight).toString();
    if (relativeVerticalOffset) {
      url.query.rel_vertical_offset = Math.floor(
        relativeVerticalOffset
      ).toString();
    }
    if (relativeHorizontalOffset) {
      url.query.rel_horizontal_offset = Math.floor(
        relativeHorizontalOffset
      ).toString();
    }
    url.query.offline = 'true';
  }
  const offlineUrl = url.toString();

  const [onlineUrl, setHighResLoaded] = React.useState('');

  const source = onlineUrl ? { uri: onlineUrl } : { uri: offlineUrl };

  const imageRef = React.useCallback(event => {
    const { width } = event.nativeEvent.layout;
    const ratio = PixelRatio.get();
    url.query.resize = (width * ratio).toString();
    url.query.offline = 'false';
    const widthUrl = url.toString();
    if (onLayout) {
      onLayout(event);
    }
    Image.getSize(
      widthUrl,
      () => {
        setHighResLoaded(widthUrl);
      },
      () => {
        if (onError) {
          onError();
        }
      }
    );
  }, []);

  const [resize, setRezize] = React.useState(
    undefined as ImageStyle['resizeMode']
  );
  React.useEffect(() => {
    Image.getSize(
      offlineUrl,
      () => {
        if (resizeMode) {
          setRezize(resizeMode);
        } else {
          setRezize('cover');
        }
      },
      () => {
        if (onError) {
          onError();
        }
      }
    );
  }, []);

  const image = (
    <Image
      fadeDuration={onlineUrl ? 0 : 300}
      source={source}
      resizeMethod={'resize'}
      style={[
        { aspectRatio },
        { borderRadius },
        styles.imageStyle,
        { resizeMode: resize },
        { borderRadius }
      ]}
    />
  );

  if (disablePlaceholder) {
    return image;
  }

  return (
    <ImageBackground
      onLayout={imageRef}
      source={logoPath}
      imageStyle={[
        styles.imageStyle,
        { resizeMode: 'center' },
        { borderRadius }
      ]}
      style={[styles.style, propStyle, { aspectRatio }, { borderRadius }]}
    >
      {image}
    </ImageBackground>
  );
};

export default ResponsiveImage;
