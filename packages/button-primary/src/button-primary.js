import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import cleanUpTitle from "../utils";
import { propTypes, defaultProps } from "./button-primary-prop-types";
import styles from "./styles";

const ButtonPrimary = ({ onPress, style, title }) => {
  const cleanTitle = cleanUpTitle(title);
	return (
	  <View style={[styles.listErrorButtonContainer, style]}>
	    <TouchableOpacity accessible accessibilityLabel={cleanTitle} onPress={onPress}>
	      <View style={styles.listErrorButton}>
	        <Text style={styles.listErrorButtonText}>{cleanTitle}</Text>
	      </View>
	    </TouchableOpacity>
	  </View>
	);
}

ButtonPrimary.propTypes = propTypes;
ButtonPrimary.defaultProps = defaultProps;

export default ButtonPrimary;
