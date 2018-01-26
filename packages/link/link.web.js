import React from "react";
import PropTypes from "prop-types";
import withResponsiveStyles from "@times-components/responsive-styles";

const RespLink = responsiveLinkStyles =>
  withResponsiveStyles("a", {
    base: () => `${responsiveLinkStyles.base}`,
    mediumUp: () => `${responsiveLinkStyles.medium}`
  });

const Link = ({ index, url, onPress, children, responsiveLinkStyles }) => {
  const Wrapper =
    responsiveLinkStyles !== null ? RespLink(responsiveLinkStyles) : "a";

  const style =
    responsiveLinkStyles !== null
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
  responsiveLinkStyles: PropTypes.shape({
    base: PropTypes.string,
    medium: PropTypes.string
  }),
  index: PropTypes.string
};

Link.defaultProps = {
  responsiveLinkStyles: null,
  index: "0"
};

export default Link;
export { default as TextLink } from "./text-link";
