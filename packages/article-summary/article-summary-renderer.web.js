import React from "react";

export default {
  paragraph(key, attributes, renderedChildren) {
    return <span key={key}>{renderedChildren}. </span>;
  },
  teaser(key, attributes, renderedChildren) {
    return <span key={key}>{renderedChildren}...</span>;
  }
};
