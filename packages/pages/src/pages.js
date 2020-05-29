/* eslint-disable global-require */
import withErrorBoundaries from "./with-error-boundaries";

export default page => {
  switch (page) {
    case "Article": {
      return withErrorBoundaries(require("./article").default);
    }
    case "AuthorProfile": {
      return withErrorBoundaries(require("./author-profile").default);
    }
    case "Section": {
      return withErrorBoundaries(require("./section").default);
    }
    case "Topic": {
      return withErrorBoundaries(require("./topic").default);
    }
    default: {
      return withErrorBoundaries(require("./article").default);
    }
  }
};
