import React, { Fragment } from "react";
import { TcView } from "@times-components/utils";
import PropTypes from "prop-types";
import { ItemRowSeparator } from "../shared";

const VerticalLayout = ({ style, tiles }) => (
  <TcView style={style}>
    {tiles.map((tile, index) => (
      <Fragment key={`${tile.props.tileName}`}>
        {tile}
        {index !== tiles.length - 1 ? <ItemRowSeparator /> : null}
      </Fragment>
    ))}
  </TcView>
);

VerticalLayout.propTypes = {
  style: PropTypes.shape({}),
  tiles: PropTypes.arrayOf(PropTypes.node).isRequired
};

VerticalLayout.defaultProps = {
  style: {}
};

export default VerticalLayout;
