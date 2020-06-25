import {
  authorArticlesWithImages,
  authorArticlesWithImagesPTV
} from "@times-components-native/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(
  authorArticlesWithImages,
  authorArticlesWithImagesPTV
);
