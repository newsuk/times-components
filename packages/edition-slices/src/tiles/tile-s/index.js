import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import coreRenderers from "@times-components/markup";
import renderTrees from "@times-components/markup-forest";
import renderer from "./markup";
import styles from "./styles";

function renderAst(ast) {
  return renderTrees(ast, {
    ...coreRenderers,
    ...renderer
  });
}

const TileS = ({ tile }) => (
  <View style={styles.container}>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{tile.title}</Text>
    </View>
    <Text style={styles.paragraph}>{renderAst(tile.content)}</Text>
    {tile.byline &&
      tile.byline.length > 0 && (
        <Text style={styles.byline}>{renderAst(tile.byline)}</Text>
      )}
  </View>
);

TileS.propTypes = {
  tile: PropTypes.shape({}).isRequired
};

export default TileS;
