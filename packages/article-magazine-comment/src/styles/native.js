import sharedStyles from "./shared";

const nativeStyles = {
  ...sharedStyles,
  authorImage: {
    ...sharedStyles.authorImage,
    borderRadius: 50,
    height: 100,
    overflow: "hidden",
    width: 100
  },
  authorImageTablet: {
    height: 108,
    width: 108
  },
  standFirst: {
    ...sharedStyles.standFirst,
    lineHeight: 25
  }
};

export default nativeStyles;
