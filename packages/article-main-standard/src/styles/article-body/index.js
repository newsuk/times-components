import { spacing } from "@times-components/ts-styleguide";
import sharedStylesFactory from "./shared";
import globalStyle from "../shared";

const sharedStyles = sharedStylesFactory();

const webStyles = {
  ...sharedStyles,
  ad: {
    ...sharedStyles.ad,
    marginBottom: spacing(6),
    marginTop: spacing(6)
  },
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    marginTop: 0
  }
};

const styles = {
  ...globalStyle,
  ...webStyles
};

export default styles;
