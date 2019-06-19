import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    padding: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "infoTitle"
    }),
    paddingBottom: spacing(1)
  },
  imageContainer: {
    overflow: "hidden",
    width: "30%"
  },
  summaryContainer: {
    justifyContent: "center",
    paddingHorizontal: spacing(2),
    paddingTop: spacing(1),
    width: "70%",
    paddingBottom: 0
  }
};

export default styles;
