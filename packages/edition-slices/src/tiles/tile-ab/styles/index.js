import { fonts, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 30,
    lineHeight: 30,
    marginBottom: spacing(1)
  },
  image: {
    alignSelf: "flex-end"
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: spacing(2),
    width: "50%"
  },
  summaryContainer: {
    paddingRight: spacing(2),
    paddingVertical: spacing(2),
    width: "50%"
  }
};

export default styles;
