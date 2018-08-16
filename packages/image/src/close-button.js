import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import Button from "@times-components/link";
import styles from "./styles";

const CloseButton = ({ onPress }) => (
  <Button onPress={onPress}>
    <Image
      resizeMode="contain"
      // eslint-disable-next-line global-require
      source={require("../assets/close-button.png")}
      style={styles.closeButton}
    />
  </Button>
);

CloseButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default CloseButton;
