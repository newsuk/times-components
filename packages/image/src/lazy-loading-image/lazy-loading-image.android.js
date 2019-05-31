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
    { name: "offline", value: true },
    { name: "rel_height", value: relativeHeight },
    { name: "rel_width", value: relativeWidth },
    { name: "rel_horizontal_offset", value: relativeHorizontalOffset },
    { name: "rel_vertical_offset", value: relativeVerticalOffset }
  ];

  return (
    <Fragment>
      {source && source.uri && !source.uri.includes("data:image/") ? (
        <Image
          {...props}
          source={
            source
              ? {
                  uri: appendParamsToQuery(source.uri, queryArray)
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
