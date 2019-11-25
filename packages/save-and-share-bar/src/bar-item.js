import React from "react";
import { View } from "react-native";
import { HoverIcon } from "@times-components/utils";
import Link from "@times-components/link";
import PropTypes from "prop-types";
import styles from "./styles";

/* eslint-disable jsx-a11y/anchor-is-valid, react/require-default-props */
const BarItem = ({
  children,
  colour = styles.svgIcon.fillColour,
  dataTestId,
  hoverColour = styles.svgIcon.hoverFillColour,
  onPress = () => {},
  ...props
}) => (
  <View data-testid={dataTestId}>
    <Link onPress={onPress} responsiveLinkStyles={styles.link} {...props}>
      <HoverIcon colour={colour} hoverColour={hoverColour}>
        {children}
      </HoverIcon>
    </Link>
  </View>
);

BarItem.propTypes = {
  children: PropTypes.node.isRequired,
  colour: PropTypes.string,
  dataTestId: PropTypes.string,
  hoverColour: PropTypes.string,
  onPress: PropTypes.func
};

export default BarItem;
