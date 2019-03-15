import React from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";
import Button from "@times-components/link";
import styles from "./styles";

const CloseButton = ({ isTablet, onPress }) => (
  <Button onPress={onPress}>
    <View style={[styles.closeButton, isTablet && styles.closeButtonTablet]}>
      <Image
        resizeMode="contain"
        // eslint-disable-next-line global-require
        source={require("../assets/close-button.png")}
        style={styles.closeButtonImage}
      />
    </View>
  </Button>
);

CloseButton.propTypes = {
  isTablet: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

export default CloseButton;
