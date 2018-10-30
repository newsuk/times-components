import { spacing } from "@times-components/styleguide";
import sharedStylesFactory from "./shared";

export default scale => {
  const sharedStyles = sharedStylesFactory(scale);
  return {
    ...sharedStyles,
    articleTextElement: {
      ...sharedStyles.articleTextElement,
      marginBottom: spacing(4)
    }
  };
};
