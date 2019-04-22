import React from "react";
import { LinkWithPressedStyle } from "@times-components/link";
import styled from "styled-components";
import styles from "./styles";

const HoverIcon =
  styled.div &&
  styled.div`
    color: ${props => props.color};
    &:hover {
      color: ${props => props.hoverColor || props.color};
    }
  `;

const BarItem = ({
  children,
  color = styles.svgIcon.fillColour,
  hoverColor = styles.svgIcon.hoverFillColour,
  ...props
}) => (
  <LinkWithPressedStyle
    pressedStyle={styles.clickedLink}
    style={styles.link}
    {...props}
  >
    <HoverIcon color={color} hoverColor={hoverColor}>
      {children}
    </HoverIcon>
  </LinkWithPressedStyle>
);

export default BarItem;
