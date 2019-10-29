import { colours } from '@times-components/styleguide';
import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

const imageStyle: StyleProp<ImageStyle> = {
  width: '100%'
};

const style: StyleProp<ViewStyle> = {
  backgroundColor: colours.functional.backgroundSecondary,
  width: '100%'
};

export default {
  imageStyle,
  style
};
