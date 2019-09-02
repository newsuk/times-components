/* eslint-disable react/require-default-props */
import React from "react";
import styled from "styled-components";
import { breakpoints } from "@times-components/styleguide";
import PropTypes from "prop-types";

const respStylesSelector = selector => ({ responsiveLinkStyles }) =>
  (responsiveLinkStyles && responsiveLinkStyles[selector]) || "";

const RespLink = styled.a`
  text-decoration: ${props =>
    props.underlined && props.responsiveLinkStyles ? "underline" : "none"};

  ${respStylesSelector("base")};

  @media (min-width: ${breakpoints.medium}px) {
    ${respStylesSelector("medium")};
  }
`;

const Link = ({
  children,
  url,
  onPress = () => {},
  target = null,
  underlined = true,
  responsiveLinkStyles = null
}) => {
  const props = {
    underlined,
    target,
    responsiveLinkStyles
  };

  return (
    <RespLink href={url} onClick={onPress} {...props}>
      {children}
    </RespLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
  onPress: PropTypes.func,
  target: PropTypes.string,
  underlined: PropTypes.bool,
  responsiveLinkStyles: PropTypes.shape({
    base: PropTypes.string,
    medium: PropTypes.string
  })
};

export default Link;
export { default as TextLink } from "./text-link";
