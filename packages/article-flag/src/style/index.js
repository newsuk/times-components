import { spacing, fontFactory } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  bullet: {
    ...sharedStyles.bullet,
    marginBottom: 3
  },
  flags: {
    ...sharedStyles.flags,
    marginBottom: spacing(1),
    marginTop: 0
  },
  title: {
    ...sharedStyles.title,
    ...fontFactory({
      font: "body",
      fontSize: "cardMetaMobile"
    }),
    fontWeight: "bold",
    lineHeight: 10,
    textTransform: "uppercase",
    fontSize: 10,
    letterSpacing: 0,
    includeFontPadding: false,
    paddingBottom: spacing(0),
    marginBottom: spacing(0)
  },
  view: {
    ...sharedStyles.view,
    marginTop: -3
  }
};

export default styles;
