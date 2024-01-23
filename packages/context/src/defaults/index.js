import { scales } from "@times-components/ts-styleguide";

export default {
  makeArticleUrl: ({ path, slug, shortIdentifier }) =>
    slug && shortIdentifier
      ? `https://www.thetimes.co.uk/${path || 'article'}/${slug}-${shortIdentifier}`
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
