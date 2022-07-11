import React, { Fragment } from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { ItemColSeparator } from "../shared";

const HorizontalLayout = ({ containerStyle, tiles, colSeparatorStyle }) => (
  <TcView style={containerStyle}>
    {tiles.map(({ tile, style }, index) => (
      <Fragment key={`${tile.props.tileName}`}>
        <TcView style={style}>{tile}</TcView>
        {index !== tiles.length - 1 ? (
          <ItemColSeparator style={colSeparatorStyle} />
        ) : null}
      </Fragment>
    ))}
  </TcView>
);

HorizontalLayout.propTypes = {
  containerStyle: PropTypes.shape({}),
  colSeparatorStyle: PropTypes.shape({}),
  tiles: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.object,
      tile: PropTypes.node.isRequired
    })
  ).isRequired
};

HorizontalLayout.defaultProps = {
  containerStyle: {},
  colSeparatorStyle: {}
};

export default HorizontalLayout;
