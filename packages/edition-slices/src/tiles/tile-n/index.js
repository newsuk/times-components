import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { colours } from "@times-components/styleguide";
import { TileImage, TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileN = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={1}
        style={styles.imageContainer}
        uri={tile.article.leadAsset.crop11.url}
      />
      <TileSummary
        flagColour={styles.flagColour}
        headlineStyle={styles.headline}
        labelColour={colours.functional.greyLabel}
        style={styles.summaryContainer}
        summary={tile.article.summary125}
        summaryStyle={styles.summary}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileN.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileN;
