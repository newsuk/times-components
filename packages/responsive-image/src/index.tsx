import * as React from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  ImageStyle,
  PixelRatio
} from 'react-native';
import Url from 'url-parse';
import logoPath from '../assets/t.png';
import styles from './styles';

interface ResponsiveImageProps {
  readonly aspectRatio?: number;
  readonly onImagePress?: () => void;
  readonly caption?: JSX.Element;
  readonly uri: string;
  readonly relativeHeight?: number;
  readonly relativeHorizontalOffset?: number;
  readonly relativeVerticalOffset?: number;
  readonly relativeWidth?: number;
  readonly resizeMode?: ImageStyle['resizeMode'];
  readonly rounded?: boolean;
  readonly style?: any;
  readonly onLayout?: (ev: any) => {};
  readonly onError?: () => void;
  readonly disablePlaceholder?: boolean;
}

interface ElementProps {
  readonly source: ImageSourcePropType;
  readonly onLoadEnd?: () => void;
  readonly onLoad?: () => void;
  readonly aspectRatio?: ResponsiveImageProps['aspectRatio'];
  readonly borderRadius: number;
  readonly resize: ImageStyle['resizeMode'];
  readonly fadeDuration: number;
  readonly onError?: () => void;
}

const ImageElement = ({
  source,
  onLoadEnd,
  onLoad,
  aspectRatio,
  borderRadius,
  resize,
  fadeDuration,
  onError
}: ElementProps) => (
  <Image
    fadeDuration={fadeDuration}
    source={source}
    onLoadEnd={onLoadEnd}
    onLoad={onLoad}
    resizeMethod={'resize'}
    onError={onError}
    style={[
      { aspectRatio },
      { borderRadius },
      styles.imageStyle,
      { resizeMode: resize },
      { borderRadius }
    ]}
  />
);

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
    url.query.rel_width = (relativeWidth || 1).toString();
    url.query.rel_height = (relativeHeight || 1).toString();
    if (relativeVerticalOffset) {
      url.query.rel_vertical_offset = (relativeVerticalOffset || 0).toString();
    }
    if (relativeHorizontalOffset) {
      url.query.rel_horizontal_offset = (
        relativeHorizontalOffset || 0
      ).toString();
    }
    url.query.offline = 'true';
  }
  const offlineUrl = url.toString();
  const [width, setWidth] = React.useState(0);
  const ratio = PixelRatio.get();
  url.query.resize = (width * ratio).toString();
  url.query.offline = 'false';
  const onlineUrl = url.toString();
  const [loaded, setLoaded] = React.useState(false);
  const [showOffline, setShowOffline] = React.useState(true);

  const imageRef = React.useCallback(event => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setWidth(layoutWidth);
    if (onLayout) {
      onLayout(event);
    }
  }, []);

  const loadHighRes = () => {
    setLoaded(true);
  };

  const hideLowRes = () => {
    setShowOffline(false);
  };

  const hideHighRes = () => {
    setLoaded(false);
    if (onError) {
      onError();
    }
  };

  const resize = resizeMode || 'cover';

  const highRes = loaded && (
    <ImageElement
      key="online"
      source={{ uri: onlineUrl }}
      onLoad={hideLowRes}
      aspectRatio={aspectRatio}
      borderRadius={borderRadius}
      onError={hideHighRes}
      resize={resize}
      fadeDuration={0}
    />
  );
  const lowRes = (disablePlaceholder || showOffline) && (
    <ImageElement
      key="offline"
      source={{ uri: offlineUrl }}
      onLoadEnd={!disablePlaceholder ? loadHighRes : undefined}
      aspectRatio={aspectRatio}
      borderRadius={borderRadius}
      onError={onError}
      resize={resize}
      fadeDuration={300}
    />
  );

  if (disablePlaceholder) {
    return <React.Fragment>{[lowRes, highRes].filter(Boolean)}</React.Fragment>;
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
      {lowRes}
      {highRes}
    </ImageBackground>
  );
};

export default ResponsiveImage;
