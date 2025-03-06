import React from "react";
import PropTypes from "prop-types";

const TcFlatList = ({ data, initialNumToRender, RenderItem }) => {
  if (Array.isArray(data)) {
    const render = data.map((v, i) => {
      if (i < initialNumToRender) {
        return <div role="listitem">{RenderItem({ data: v, key: i })}</div>;
      }
      return null;
    });

    if (render.length) {
      return <div role="list">{render}</div>;
    }
  }

  return null;
};

TcFlatList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.element).isRequired,
  initialNumToRender: PropTypes.number.isRequired,
  RenderItem: PropTypes.element.isRequired
};

export default TcFlatList;
