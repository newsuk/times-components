/* eslint-disable react/require-default-props */
import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import coreRenderers from "@times-components/markup";
import renderTrees from "@times-components/markup-forest";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import renderer from "./markup";
import styleFactory from "./styles";

function renderAst(ast) {
  return renderTrees(ast, {
    ...coreRenderers,
    ...renderer
  });
}

const TileS = ({
  tile,
  breakpoint = editionBreakpoints.small,
  logo = null
}) => {
  const styles = styleFactory(breakpoint);
  const headLineStyles =
    breakpoint === editionBreakpoints.medium && logo
      ? styles.titleWithoutMargin
      : styles.title;

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        {logo}
        <Text style={headLineStyles}>{tile.title}</Text>
      </View>
      <Text style={styles.paragraph}>{renderAst(tile.content)}</Text>
      {tile.byline &&
        tile.byline.length > 0 && (
          <Text style={styles.byline}>{renderAst(tile.byline)}</Text>
        )}
    </View>
  );
};

TileS.propTypes = {
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string,
  logo: PropTypes.element
};

export default TileS;
