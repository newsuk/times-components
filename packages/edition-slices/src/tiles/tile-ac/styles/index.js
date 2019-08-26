import {
  colours,
  fonts,
  spacing
} from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    padding: spacing(2)
  },
  headline: {
    color: colours.functional.brandColour,
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 0,
    textAlign: "center"
  },
  imageContainer: {
    width: "100%"
  },
  summaryContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.functional.border,
    paddingHorizontal: spacing(4),
    paddingVertical: spacing(3)
  }
};

export default styles;
