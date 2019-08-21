import React, { Fragment } from "react";
import { Image } from "react-native";
import { appendParamsToQuery } from "../utils";

const LazyLoadingImage = props => {
  const {
    source,
    relativeWidth,
    relativeHeight,
    relativeHorizontalOffset,
    relativeVerticalOffset,
    fill
  } = props;

  const queryObject = {
    offline: true,
    rel_height: relativeHeight,
    rel_width: relativeWidth,
    rel_horizontal_offset: relativeHorizontalOffset,
    rel_vertical_offset: relativeVerticalOffset
  };

  Object.keys(queryObject).forEach(k => {
    if (queryObject[k] === undefined) {
      delete queryObject[k];
    }
  });

  return (
    <Fragment>
      {source && source.uri && !source.uri.includes("data:image/") ? (
        <Image
          {...props}
          resizeMode={fill ? "cover" : "center"}
          source={{ uri: appendParamsToQuery(source.uri, queryObject) }}
        />
      ) : null}
      <Image {...props} />
    </Fragment>
  );
};

export default LazyLoadingImage;
