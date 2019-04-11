import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { TileSummary, TileLink, withTileTracking } from "../shared";
import styles from "./styles";

const TileO = ({ isDarkStar, onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileSummary
        flagColour={styles.flagColour}
        headlineStyle={styles.headlineStyle}
        isDarkStar={isDarkStar}
        labelColour={colours.functional.greyLabel}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileO.propTypes = {
  isDarkStar: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

TileO.defaultProps = {
  isDarkStar: true
};

export default withTileTracking(TileO);
