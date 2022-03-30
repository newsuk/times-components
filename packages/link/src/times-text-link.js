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
const TimesTextLink = ({ children, onPress, style, target, url, ...props }) => {
  const linkStyles = { ...styles.textLink, ...style };
  const textProps = {
    ...props,
    accessibilityRole: "link",
    href: url,
    onPress,
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

TimesTextLink.propTypes = propTypes;
TimesTextLink.defaultProps = defaultProps;

export default TimesTextLink;
