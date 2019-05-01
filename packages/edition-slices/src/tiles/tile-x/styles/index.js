import { fonts, fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  },
  headline: {
    fontFamily: fonts.headline,
    fontSize: 40,
    lineHeight: 40
  },
  strapline: {
    ...fontFactory({
      font: "bodyRegular",
      fontSize: "pageComponentHeadline"
    }),
    paddingBottom: spacing(1)
  },
  summaryContainer: {
    marginHorizontal: spacing(2),
    marginVertical: spacing(1)
  }
};

export default styles;
