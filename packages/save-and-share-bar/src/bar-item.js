import React from "react";
import Link from "@times-components/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "./styles";

const HoverIcon =
  styled.div &&
  styled.div`
    color: ${props => props.color};
    &:hover {
      color: ${props => props.hoverColor || props.color};
    }
  `;

/* eslint-disable jsx-a11y/anchor-is-valid */
const BarItem = ({ children, color, hoverColor, onPress, ...props }) => (
  <Link onPress={onPress} responsiveLinkStyles={styles.link} {...props}>
    <HoverIcon color={color} hoverColor={hoverColor}>
      {children}
    </HoverIcon>
  </Link>
);

BarItem.defaultProps = {
  color: styles.svgIcon.fillColour,
  hoverColor: styles.svgIcon.hoverFillColour,
  onPress: () => {}
};

BarItem.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  onPress: PropTypes.func
};

export default BarItem;
