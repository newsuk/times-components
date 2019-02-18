import React from "react";
import { Dimensions, View } from "react-native";
import PropTypes from "prop-types";
import { TileImage, TileLink, TileSummary } from "../shared";
import styles from "./styles";

const TileP = ({ onPress, tile }) => (
  <TileLink onPress={onPress} tile={tile}>
    <View style={styles.container}>
      <TileImage
        aspectRatio={1}
        borderRadius={Dimensions.get("window").width / 4}
        style={styles.imageContainer}
        uri={tile.article.leadAsset.crop11.url}
      />
      <TileSummary
        bylineStyle={styles.bylineOpinion}
        headlineStyle={styles.headline}
        strapline={tile.strapline}
        straplineStyle={styles.strapline}
        style={styles.summaryContainer}
        tile={tile}
      />
    </View>
  </TileLink>
);

TileP.propTypes = {
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileP;
