import React from "react";
import PropTypes from "prop-types";
import Link from "@times-components/link";

const TileLink = ({
  children,
  onPress,
  style,
  tile: {
    article: { id, url }
  }
}) => (
  <Link linkStyle={style} onPress={() => onPress({ id, url })} url={url}>
    {children}
  </Link>
);

TileLink.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  tile: PropTypes.shape({}).isRequired
};

TileLink.defaultProps = {
  style: {}
};

export default TileLink;
