import React from "react";
import styled from "styled-components";
import { breakpoints } from "@times-components/styleguide";
import PropTypes from "prop-types";

const RespLink = responsiveLinkStyles =>
  styled.a`
    ${responsiveLinkStyles.base} @media (min-width: ${breakpoints.medium}px) {
      ${responsiveLinkStyles.medium};
    }
  `;

const Link = ({ children, onPress, responsiveLinkStyles, target, url }) => {
  const Wrapper =
    responsiveLinkStyles !== null ? RespLink(responsiveLinkStyles) : "a";

  const style =
    responsiveLinkStyles !== null
      ? { textDecoration: "underline" }
      : { textDecoration: "none" };

  const props = {
    href: url,
    onClick: onPress,
    style
  };

  return target ? (
    <Wrapper {...props} target={target}>
      {children}
    </Wrapper>
  ) : (
    <Wrapper {...props}>{children}</Wrapper>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  responsiveLinkStyles: PropTypes.shape({
    base: PropTypes.string,
    medium: PropTypes.string
  }),
  target: PropTypes.string,
  url: PropTypes.string.isRequired
};

Link.defaultProps = {
  onPress: () => {},
  responsiveLinkStyles: null,
  target: null
};

export default Link;
export { default as TextLink } from "./text-link";
export { default as LinkWithPressedStyle } from "./link-with-pressed-style.web";
