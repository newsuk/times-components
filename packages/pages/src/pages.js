/* eslint-disable global-require */
export default page => {
  switch (page) {
    case "Article": {
      return require("./article").default;
    }
    case "AuthorProfile": {
      return require("./author-profile").default;
    }
    case "Section": {
      return require("./section").default;
    }
    case "Topic": {
      return require("./topic").default;
    }
    default: {
      return require("./article").default;
    }
  }
};
