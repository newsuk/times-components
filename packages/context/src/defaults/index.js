import { scales } from "@times-components/ts-styleguide";

export default {
  makeArticleUrl: ({ slug, shortIdentifier }) =>
    slug && shortIdentifier
      ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
      : "",
  makeTopicUrl: ({ slug }) => `/topic/${slug}`,
  theme: {
    scale: scales.medium
  },
  user: {
    isLoggedIn: false,
    isMetered: false,
    isMeteredExpired: false,
    isShared: false,
    registrationType: ""
  }
};
