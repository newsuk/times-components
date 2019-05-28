import React from "react";
import PropTypes from "prop-types";
import Link from "@times-components/link";
import TileStar from "./tile-star";
import { tileStar } from "./styles";
import { isSaveSupported } from "./utils";

const TileLink = ({
  children,
  onPress,
  style,
  isDarkStar,
  withStar,
  starStyle,
  tile: {
    article: { id, url }
  }
}) => (
  <Link linkStyle={style} onPress={() => onPress({ id, url })} url={url}>
    {children}
    {withStar &&
      isSaveSupported && (
        <TileStar
          articleId={id}
          isDark={isDarkStar}
          style={[tileStar, starStyle]}
        />
      )}
  </Link>
);

TileLink.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  starStyle: PropTypes.shape({}),
  isDarkStar: PropTypes.bool,
  withStar: PropTypes.bool,
  style: PropTypes.shape({}),
  tile: PropTypes.shape({}).isRequired
};

TileLink.defaultProps = {
  isDarkStar: false,
  withStar: true,
  starStyle: null,
  style: {}
};

export default TileLink;
