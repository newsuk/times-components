import { colours, tabletWidth } from "@times-components/styleguide";

const sharedStyles = {
  topicsContainer: {
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1
  },
  topicsContainerTablet: {
    alignSelf: "center",
    width: tabletWidth
  },
  topicsMetaContainer: {
    justifyContent: "flex-start"
  }
};

export default sharedStyles;
