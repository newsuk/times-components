import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flexDirection: "row",
    padding: spacing(2)
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
    width: "50%"
  },
  summaryContainer: {
    paddingRight: spacing(2),
    width: "50%"
  }
};

export default styles;
