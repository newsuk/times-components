import React from "react";
import PropTypes from "prop-types";

const Link = ({ url, onPress, children }) => (
  <a href={url} onClick={onPress} style={{ textDecoration: "none" }}>
    {children}
  </a>
);

Link.propTypes = {
  url: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Link;
export { default as TextLink } from "./text-link";
