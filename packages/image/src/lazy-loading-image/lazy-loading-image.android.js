import React, { Fragment } from "react";
import { Image } from "react-native";
import { appendParamsToQuery } from "../utils";

const LazyLoadingImage = props => {
  const {
    source,
    relativeWidth,
    relativeHeight,
    relativeHorizontalOffset,
    relativeVerticalOffset
  } = props;

  const queryArray = [
    ["offline", true],
    ["rel_height", relativeHeight],
    ["rel_width", relativeWidth],
    ["rel_horizontal_offset", relativeHorizontalOffset],
    ["rel_vertical_offset", relativeVerticalOffset]
  ];
  const queryParamMap = new Map(queryArray);

  return (
    <Fragment>
      {source && source.uri && !source.uri.includes("data:image/") ? (
        <Image
          {...props}
          source={
            source
              ? {
                  uri: appendParamsToQuery(source.uri, queryParamMap)
                }
              : null
          }
        />
      ) : null}
      <Image {...props} />
    </Fragment>
  );
};

export default LazyLoadingImage;
