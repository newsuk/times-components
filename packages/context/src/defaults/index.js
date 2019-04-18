import { scales } from "@times-components/styleguide";

export default {
  makeArticleUrl: ({ slug, shortIdentifier }) =>
    slug && shortIdentifier
      ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
      : "",
  theme: {
    imageCaptionAlignment: {},
    scale: scales.medium
  }
};
