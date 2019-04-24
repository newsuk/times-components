import React from "react";
import Link from "@times-components/link";
import styled from "styled-components";
import PropTypes from "prop-types";
import styles from "./styles";

const HoverIcon =
  styled.div &&
  styled.div`
    color: ${props => props.colour};
    &:hover {
      color: ${props => props.hoverColour || props.colour};
    }
  `;

/* eslint-disable jsx-a11y/anchor-is-valid, react/require-default-props */
const BarItem = ({
  children,
  colour = styles.svgIcon.fillColour,
  hoverColour = styles.svgIcon.hoverFillColour,
  onPress,
  ...props
}) => (
  <Link onPress={onPress} responsiveLinkStyles={styles.link} {...props}>
    <HoverIcon colour={colour} hoverColour={hoverColour}>
      {children}
    </HoverIcon>
  </Link>
);

BarItem.propTypes = {
  children: PropTypes.node.isRequired,
  colour: PropTypes.string,
  hoverColour: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export default BarItem;
