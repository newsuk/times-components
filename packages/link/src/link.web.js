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

const Link = ({
  children,
  index,
  onPress,
  responsiveLinkStyles,
  target,
  url
}) => {
  const Wrapper =
    responsiveLinkStyles !== null ? RespLink(responsiveLinkStyles) : "a";

  const style =
    responsiveLinkStyles !== null
      ? { textDecoration: "underline" }
      : { textDecoration: "none" };

  const props = {
    href: url,
    key: index,
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
  index: PropTypes.string,
  onPress: PropTypes.func,
  responsiveLinkStyles: PropTypes.shape({
    base: PropTypes.string,
    medium: PropTypes.string
  }),
  target: PropTypes.string,
  url: PropTypes.string.isRequired
};

Link.defaultProps = {
  index: "0",
  onPress: () => {},
  responsiveLinkStyles: null,
  target: null
};

export default Link;
export { default as TextLink } from "./text-link";
