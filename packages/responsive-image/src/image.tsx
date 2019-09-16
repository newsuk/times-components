import * as React from 'react';
import { Image, ImageProps, InteractionManager, View } from 'react-native';
import Url from 'url-parse';
import logoPath from '../assets/t.png';
import styles from './styles';

interface ResponsiveImageProps extends ImageProps {
  readonly aspectRatio?: number;
  readonly onImagePress?: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly caption?: JSX.Element;
}

// TODO: handle all dimension types
const ResponsiveImage = (props: ResponsiveImageProps) => {
  const {
    source,
    aspectRatio: propAspect = 0,
    width: propWidth = 0,
    height: propHeight = 0,
    style: propStyle
  } = props;

  if (typeof source === 'number' || !('uri' in source) || !source.uri) {
    throw new Error('Image source must be a URIImageSource');
  }

  const url = new Url(source.uri, true);
  const onlineUrl = url.toString();
  url.query.offline = 'true';
  const offlineUrl = url.toString();

  const [highResLoaded, setHighResLoaded] = React.useState(false);
  // tslint:disable-next-line: prefer-const
  let [aspectRatio, setAspectRatio] = React.useState(propAspect);
  // tslint:disable-next-line: prefer-const
  let [width, setWidth] = React.useState(propWidth);
  // tslint:disable-next-line: prefer-const
  let [height, setHeight] = React.useState(propHeight);

  if (height && aspectRatio && !width) {
    width = height / aspectRatio;
  }

  if (width && aspectRatio && !height) {
    height = width * aspectRatio;
  }

  if (width && height && !aspectRatio) {
    aspectRatio = width / height;
  }

  React.useEffect(
    () => {
      let unmounted = false;
      const loadHighRes = InteractionManager.runAfterInteractions(() => {
        Image.getSize(
          onlineUrl,
          (w, h) => {
            if (!unmounted) {
              setHighResLoaded(true);
              if (!aspectRatio) {
                setAspectRatio(w / h);
              }
              if (!width) {
                setWidth(w);
              }
              if (!height) {
                setHeight(h);
              }
            }
          },
          () => undefined
        );
      });
      const loadLowRes =
        height && !width
          ? null
          : Image.getSize(
              offlineUrl,
              (w, h) => {
                if (!unmounted) {
                  if (!aspectRatio) {
                    setAspectRatio(w / h);
                  }
                  if (!width) {
                    setWidth(w);
                  }
                  if (!height) {
                    setHeight(h);
                  }
                }
              },
              () => undefined
            );
      return () => {
        loadHighRes.cancel();
        if (loadLowRes) {
          loadLowRes.cancel();
        }
        unmounted = true;
      };
    },
    [source.uri]
  );

  const defaultSource = highResLoaded ? { uri: offlineUrl } : logoPath;

  return (
    <View style={[styles.style, { width, height }, propStyle]}>
      <Image
        progressiveRenderingEnabled
        defaultSource={defaultSource}
        source={{ uri: url.toString() }}
        style={[styles.imageStyle, { width, height }]}
      />
    </View>
  );
};

export default ResponsiveImage;
