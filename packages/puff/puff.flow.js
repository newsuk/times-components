// @flow

export type PuffProps = {|
  headline: string,
  label: ?string,
  text: *, // @TODO: What is the type of "markup"?
  link: string,
  linkText?: string,
  sectionName: string,
  image: ?string,
  imageRatio: ?number,
  imageSize: ?number,
  onPress: Event => void
|};
