import { fontsWithFallback, fontSizes } from "@times-components/ts-styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  link: {
    ...sharedStyles.link,
    fontFamily: fontsWithFallback.supporting,
    fontSize: fontSizes.commentsGuidelines
  }
};

export default styles;
