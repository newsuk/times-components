import React from "react";

export default {
  sentence(key, attributes, renderedChildren) {
    return <span key={key}>{renderedChildren}. </span>;
  },
  teaser(key, attributes, renderedChildren) {
    return <span key={key}>{renderedChildren}...</span>;
  }
};
