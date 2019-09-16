import { colours } from '@times-components/styleguide';
import { ImageStyle, StyleProp, StyleSheet, ViewStyle } from 'react-native';

const imageStyle: StyleProp<ImageStyle> = {
  resizeMode: 'cover',
  width: '100%'
};

const style: StyleProp<ViewStyle> = {
  backgroundColor: colours.functional.backgroundSecondary,
  width: '100%'
};

export default StyleSheet.create({
  imageStyle,
  style
});
