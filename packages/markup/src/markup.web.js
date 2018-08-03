import React from "react";

export default {
  block(key, attributes, renderedChildren) {
    return {
      element: <div key={key}>{renderedChildren}</div>
    };
  },
  bold(key, attributes, renderedChildren) {
    return {
      element: <strong key={key}>{renderedChildren}</strong>
    };
  },
  break(key) {
    return {
      element: <br key={key} />
    };
  },
  italic(key, attributes, renderedChildren) {
    return {
      element: <em key={key}>{renderedChildren}</em>
    };
  },
  inline(key, attributes, renderedChildren) {
    return {
      element: <span key={key}>{renderedChildren}</span>
    };
  },
  paragraph(key, attributes, renderedChildren) {
    return {
      element: <p key={key}>{renderedChildren}</p>
    };
  },
  text(key, { value }) {
    return {
      element: value
    };
  }
};
