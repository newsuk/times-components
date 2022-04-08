import React from "react";
import { TcTextLink, checkStylesForUnits } from "@times-components/utils";
import styled from "styled-components";
import { defaultProps, propTypes } from "./text-link-prop-types";

const styles = {
  textLink: {
    "text-decoration": "underline"
  }
};
const LinkTextObj = styled(TcTextLink)`
  ${props => (props.style ? checkStylesForUnits(props.style) : "")};
`;
const TextLink = ({ children, onPress, style, target, url, ...props }) => {
  const linkStyles = { ...styles.textLink, ...style };
  const textProps = {
    ...props,
    accessibilityRole: "link",
    href: url,
    onClick: onPress,
    style: linkStyles
  };

  return target ? (
    <LinkTextObj {...textProps} target={target}>
      {children}
    </LinkTextObj>
  ) : (
    <LinkTextObj {...textProps}>{children}</LinkTextObj>
  );
};

TextLink.propTypes = propTypes;
TextLink.defaultProps = defaultProps;

export default TextLink;
