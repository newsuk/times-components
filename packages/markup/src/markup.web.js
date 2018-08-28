import React from "react";

export default {
  block(key, attributes, renderedChildren) {
    return {
      element: <div key={key}>{renderedChildren}</div>
    };
  },
  break(key) {
    return {
      element: <br key={key} />
    };
  },
  emphasis(key, attributes, renderedChildren) {
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
  strong(key, attributes, renderedChildren) {
    return {
      element: <strong key={key}>{renderedChildren}</strong>
    };
  },
  subscript(key, attributes, renderedChildren) {
    return {
      element: <sub key={key}>{renderedChildren}</sub>
    };
  },
  superscript(key, attributes, renderedChildren) {
    return {
      element: <sup key={key}>{renderedChildren}</sup>
    };
  },
  text(key, { value }) {
    return {
      element: value
    };
  },
  wordBreakOpportunity(key) {
    return {
      element: <wbr key={key} />
    };
  }
};
