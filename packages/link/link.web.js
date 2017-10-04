import React from "react";
import propTypes from "./link.proptypes";

const Link = ({ url, onPress, children }) => (
  <a href={url} onClick={onPress} style={{ textDecoration: "none" }}>
    {children}
  </a>
);

Link.propTypes = propTypes;

export default Link;
export { default as TextLink } from "./text-link";
