import { fonts, fontSizes } from "@times-components/styleguide";
import sharedStyles from "./shared";

const styles = {
  ...sharedStyles,
  link: {
    ...sharedStyles.link,
    fontFamily: fonts.supporting,
    fontSize: fontSizes.commentsGuidelines
  }
};

export default styles;
