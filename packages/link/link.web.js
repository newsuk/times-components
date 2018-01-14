import React from "react";
import PropTypes from "prop-types";
import withResponsiveStyles from "@times-components/responsive-styles";

const RespLink = responsivelinkStyles =>
  withResponsiveStyles("a", {
    base: () => `${responsivelinkStyles.base}`,
    mediumUp: () => `${responsivelinkStyles.medium}`
  });

const Link = ({ url, onPress, children, responsivelinkStyles }) => {
  const Wrapper =
    responsivelinkStyles !== null ? RespLink(responsivelinkStyles) : "a";

  return (
    <Wrapper href={url} onClick={onPress} style={{ textDecoration: "none" }}>
      {children}
    </Wrapper>
  );
};

Link.propTypes = {
  url: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  responsivelinkStyles: PropTypes.shape({
    base: PropTypes.string,
    medium: PropTypes.string
  })
};

Link.defaultProps = {
  responsivelinkStyles: null
};

export default Link;
export { default as TextLink } from "./text-link";
