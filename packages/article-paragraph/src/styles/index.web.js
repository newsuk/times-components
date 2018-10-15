import { fontFactory } from "@times-components/styleguide";
import sharedStylesFactory from "./shared";

const sharedStyles = sharedStylesFactory();

export default {
  ...sharedStyles,
  articleTextElement: {
    ...sharedStyles.articleTextElement,
    ...fontFactory({
      font: "body",
      fontSize: "body"
    }),
    marginTop: 0
  }
};
