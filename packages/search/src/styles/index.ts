import { colours, fontFactory, spacing } from '@times-components/styleguide';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

const container: StyleProp<ViewStyle> = {
  backgroundColor: '#FFFFFF',
  flex: 1
}

const headline: StyleProp<TextStyle> = {
  marginTop: 0
}

const item: StyleProp<ViewStyle> = {
  flexDirection: 'column',
  padding: 10,
  paddingHorizontal: 16
}

const separator: StyleProp<ViewStyle> = {
  borderBottomWidth: 1,
  borderColor: '#ddd'
}

const summary: StyleProp<ViewStyle> = {
  flex: 1,
  maxHeight: 100,
  overflow: 'hidden'
}

const image: StyleProp<ViewStyle> = {
  height: 100,
  marginRight: spacing(2),
  width: 100
}

const row: StyleProp<ViewStyle> = {
  flexDirection: 'row'
}

const searchContainer: StyleProp<ViewStyle> = {
  padding: spacing(2)
}

const input: StyleProp<TextStyle> = {
  backgroundColor: '#fff',
  borderColor: '#ddd',
  borderRadius: 4,
  borderWidth: 1,
  fontSize: 16,
  height: 48,
  padding: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2
}

const text: StyleProp<TextStyle> = {
  color: colours.functional.secondary,
  flexWrap: "wrap",
  marginBottom: spacing(2),
  ...fontFactory({
    font: "body",
    fontSize: "teaser"
  })
}

const byline: StyleProp<TextStyle> = {
  ...fontFactory({
    font: "supporting",
    fontSize: "cardMeta"
  }),
  color: colours.functional.secondary,
  flexDirection: "row",
  margin: 0,
  padding: 0
}

export default {
  byline,
  container,
  headline,
  image,
  input,
  item,
  row,
  searchContainer,
  separator,
  summary,
  text
};
