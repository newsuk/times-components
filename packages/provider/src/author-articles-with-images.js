import {
  authorArticlesWithImages,
  authorArticlesWithImagesPTV
} from "@times-components/provider-queries";
import connectGraphql from "./connect";

export default connectGraphql(
  authorArticlesWithImages,
  authorArticlesWithImagesPTV
);
