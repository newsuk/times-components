import { scales } from "@times-components/ts-styleguide";
import { BASE_URL } from "../constants";

export default {
  makeArticleUrl: ({ slug, shortIdentifier }) =>
    slug && shortIdentifier
      ? `${BASE_URL}/article/${slug}-${shortIdentifier}`
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
