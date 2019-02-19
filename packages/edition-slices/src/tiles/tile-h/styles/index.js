import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    paddingHorizontal: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    }),
    marginBottom: spacing(2)
  },
  image: {
    alignSelf: "flex-end"
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingTop: spacing(2),
    width: "45%"
  },
  summaryContainer: {
    paddingRight: spacing(2),
    paddingVertical: spacing(2),
    width: "55%"
  }
};

export default styles;
