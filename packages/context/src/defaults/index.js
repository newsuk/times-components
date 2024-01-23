import { scales } from "@times-components/ts-styleguide";

export default {
  makeArticleUrl: ({ slug, shortIdentifier }, articleCategoryPath) =>
    slug && shortIdentifier
      ? `https://www.thetimes.co.uk/${articleCategoryPath ||
          "article"}/${slug}-${shortIdentifier}`
      : "",
  makeTopicUrl: ({ slug }) => `/topic/${slug}`,
  theme: {
    scale: scales.medium
  },
  user: {
    isLoggedIn: false,
    isMetered: false,
    isShared: false,
    registrationType: ""
  }
};
