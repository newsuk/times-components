import React from "react";
import PropTypes from "prop-types";
import withResponsiveStyles from "@times-components/responsive-styles";

const RespLink = responsivelinkStyles =>
  withResponsiveStyles("a", {
    base: () => `${responsivelinkStyles.base}`,
    mediumUp: () => `${responsivelinkStyles.medium}`
  });

const Link = ({ index, url, onPress, children, responsivelinkStyles }) => {
  const Wrapper =
    responsivelinkStyles !== null ? RespLink(responsivelinkStyles) : "a";

  const style =
    responsivelinkStyles !== null
      ? { textDecoration: "underline" }
      : { textDecoration: "none" };

  return (
    <Wrapper key={index} href={url} onClick={onPress} style={style}>
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
  }),
  index: PropTypes.string
};

Link.defaultProps = {
  responsivelinkStyles: null,
  index: "0"
};

export default Link;
export { default as TextLink } from "./text-link";
