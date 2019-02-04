import React from "react";
import PropTypes from "prop-types";
import Link from "@times-components/link";

const TileLink = ({
  children,
  onPress,
  tile: {
    article: { url }
  }
}) => (
  <Link onPress={e => onPress(e, { url })} url={url}>
    {children}
  </Link>
);

TileLink.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  tile: PropTypes.shape({}).isRequired
};

export default TileLink;
