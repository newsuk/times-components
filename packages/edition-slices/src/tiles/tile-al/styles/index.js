import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: spacing(2)
  },
  headline: {
    marginBottom: 0,
    ...fontFactory({
      font: "headline",
      fontSize: "smallHeadline"
    })
  },
  imageContainer: {
    paddingVertical: spacing(2),
    width: "100%"
  },
  summaryContainer: {
    lineHeight: 1.43,
    width: "100%",
    ...fontFactory({
      font: "bodyRegular",
      fontSize: "teaser"
    })
  }
};

export default styles;
