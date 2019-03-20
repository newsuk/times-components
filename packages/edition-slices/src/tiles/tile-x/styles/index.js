import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "articleHeadline"
    })
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
