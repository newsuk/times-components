import React from "react";
import { TcView } from "@times-components/utils";
import FlatList from "flatlist-react";
import PropTypes from "prop-types";
import { ItemRowSeparator } from "../shared";

const ListVerticalLayout = ({ style, tiles }) => {
  const ids = tiles.map(
    (tile, index) => (tile.props.tile ? tile.props.tile.article.id : index)
  );
  const listKey = ids.join("");
  return (
    <FlatList
      data={tiles}
      style={style}
      listKey={listKey}
      keyExtractor={item => item.props.tileName}
      renderItem={({ item, index }) => (
        <TcView key={`${item.props.tileName}`}>
          {item}
          {index !== tiles.length - 1 ? <ItemRowSeparator /> : null}
        </TcView>
      )}
    />
  );
};

ListVerticalLayout.propTypes = {
  style: PropTypes.shape({}),
  tiles: PropTypes.arrayOf(PropTypes.node).isRequired
};

ListVerticalLayout.defaultProps = {
  style: {}
};

export default ListVerticalLayout;
