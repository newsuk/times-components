import {
  colours,
  fontFactory,
  spacing,
  tabletWidth
} from "@times-components/ts-styleguide";

const styles = {
  extrasErrorBody: {
    ...fontFactory({
      font: "supporting",
      fontSize: "tertiary"
    }),
    color: colours.functional.secondary,
    maxWidth: 330,
    textAlign: "center"
  },
  extrasErrorButton: {
    marginBottom: spacing(0),
    marginTop: spacing(5),
    maxWidth: 165
  },
  extrasErrorContainer: {
    alignItems: "center",
    borderStyle: "solid",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    marginBottom: spacing(10),
    width: "100%"
  },
  extrasErrorHeadline: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "headline",
      fontSize: "commentsHeadline"
    }),
    maxWidth: 315,
    paddingBottom: spacing(2),
    paddingTop: spacing(6),
    textAlign: "center"
  },
  relatedArticlesTablet: {
    alignSelf: "center",
    maxWidth: tabletWidth,
    width: "100%"
  }
};

export default styles;
