/* eslint-disable react/require-default-props */
import React from "react";
import { TcView, TcText, checkStylesForUnits } from "@times-components/utils";
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
    <TcView style={styles.container}>
      <TcView style={styles.titleWrapper}>
        {logo}
        <TcText style={checkStylesForUnits(headLineStyles)}>
          {tile.title}
        </TcText>
      </TcView>
      <TcText style={checkStylesForUnits(styles.paragraph)}>
        {renderAst(tile.content)}
      </TcText>
      {tile.byline &&
        tile.byline.length > 0 && (
          <TcText style={checkStylesForUnits(styles.byline)}>
            {renderAst(tile.byline)}
          </TcText>
        )}
    </TcView>
  );
};

TileS.propTypes = {
  tile: PropTypes.shape({}).isRequired,
  breakpoint: PropTypes.string,
  logo: PropTypes.element
};

export default TileS;
