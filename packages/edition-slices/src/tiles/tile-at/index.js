/* eslint-disable react/require-default-props */
import React, { Fragment } from "react";
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

const TileAT = ({ tile, logo = null }) => (
  <View style={styles.container}>
    <View style={styles.titleWrapper}>
      <Fragment>{logo}</Fragment>
      <Text style={styles.title}>{tile.title}</Text>
    </View>
    <Text style={styles.paragraph}>{renderAst(tile.content)}</Text>
    {tile.byline &&
      tile.byline.length > 0 && (
        <Text style={styles.byline}>{renderAst(tile.byline)}</Text>
      )}
  </View>
);

TileAT.propTypes = {
  tile: PropTypes.shape({}).isRequired,
  logo: PropTypes.element
};

export default TileAT;
