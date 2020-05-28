import withErrorBoundaries from "./with-error-boundaries";
/* eslint-disable global-require */

const pageMapper = {
  Article: require("./article").default,
  AuthorProfile: require("./author-profile").default,
  Section: require("./section").default,
  Topic: require("./topic").default
};

export default page =>
  withErrorBoundaries(pageMapper[page] || pageMapper.Article);
