import { spacing } from "@times-components/ts-styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  jobTitle: {
    ...sharedStyles.jobTitle,
    WebkitFontSmoothing: "antialiased"
  },
  twitter: {
    ...sharedStyles.twitter,
    alignItems: "flex-end",
    paddingBottom: spacing(2),
    paddingTop: spacing(3)
  },
  twitterIcon: {
    alignSelf: "center"
  },
  twitterLink: {
    ...sharedStyles.twitterLink
  },
  jobTitleContainer: {
    display: "flex",
    alignItems: "center"
  }
};

export default styles;
