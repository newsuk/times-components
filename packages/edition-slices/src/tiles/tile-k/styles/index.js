import { fontFactory, spacing, colours } from "@times-components/styleguide";

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
    color: colours.functional.primary,
    marginBottom: spacing(2)
  },
  imageContainer: {
    paddingRight: spacing(2),
    width: "50%"
  },
  summaryContainer: {
    width: "50%"
  }
};

export default styles;
