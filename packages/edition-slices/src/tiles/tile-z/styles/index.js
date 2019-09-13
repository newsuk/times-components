import { spacing, fonts } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(3)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 40,
    lineHeight: 40,
    marginBottom: spacing(2)
  },
  summaryContainer: {
    flex: 1,
    width: "40%",
    paddingRight: spacing(4)
  },
  imageContainer: {
    width: "60%"
  }
};

export default styles;
