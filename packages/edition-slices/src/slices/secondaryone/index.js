import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { TileA } from "../../tiles";
import styles from "./styles";

const SecondaryOneSlice = ({ onPress, slice: { secondary } }) => (
  <View style={styles.container}>
    <TileA onPress={onPress} tile={secondary} />
  </View>
);

SecondaryOneSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ secondary: PropTypes.shape({}).isRequired })
    .isRequired
};

export default SecondaryOneSlice;
