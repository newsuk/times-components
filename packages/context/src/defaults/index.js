import { scales } from "@times-components/styleguide";

export default {
  makeArticleUrl: ({ slug, shortIdentifier }) =>
    slug && shortIdentifier
      ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
      : "",
  makeTopicUrl: ({ slug }) => `/topic/${slug}`,
  theme: {
    imageCaptionAlignment: {},
    scale: scales.medium
  },
  user: {
    isLoggedIn: false
  }
};
