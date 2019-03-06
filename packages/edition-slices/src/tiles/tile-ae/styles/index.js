import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  container: {
    paddingHorizontal: spacing(2),
    paddingTop: spacing(2)
  },
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "tileLeadHeadline"
    })
  }
};

export default styles;
