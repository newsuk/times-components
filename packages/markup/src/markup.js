import React from "react";

export default {
  block(key, attributes, renderedChildren) {
    return <div key={key}>{renderedChildren}</div>;
  },
  bold(key, attributes, renderedChildren) {
    return <b key={key}>{renderedChildren}</b>;
  },
  break(key) {
    return <br key={key} />;
  },
  emphasis(key, attributes, renderedChildren) {
    return <em key={key}>{renderedChildren}</em>;
  },
  inline(key, attributes, renderedChildren) {
    return <span key={key}>{renderedChildren}</span>;
  },
  italic(key, attributes, renderedChildren) {
    return <i key={key}>{renderedChildren}</i>;
  },
  paragraph(key, attributes, renderedChildren) {
    return <p key={key}>{renderedChildren}</p>;
  },
  strong(key, attributes, renderedChildren) {
    return <strong key={key}>{renderedChildren}</strong>;
  },
  subscript(key, attributes, renderedChildren) {
    return <sub key={key}>{renderedChildren}</sub>;
  },
  superscript(key, attributes, renderedChildren) {
    return <sup key={key}>{renderedChildren}</sup>;
  },
  text(key, { value }) {
    return value;
  }
};
