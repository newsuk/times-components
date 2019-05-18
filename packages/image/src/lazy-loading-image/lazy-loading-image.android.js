import React, { Component, Fragment } from "react";
import { Image } from "react-native";
import { appendParamsToQuery } from "../utils";

class LazyLoadingImage extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }

  render() {
    const {
      source,
      relativeWidth,
      relativeHeight,
      relativeHorizontalOffset,
      relativeVerticalOffset
    } = this.props;
    const { error } = this.state;

    const queryArray = [
      ["offline", true],
      ["rel_height", relativeHeight],
      ["rel_width", relativeWidth],
      ["rel_horizontal_offset", relativeHorizontalOffset],
      ["rel_vertical_offset", relativeVerticalOffset]
    ];
    const queryParamMap = new Map(queryArray);

    const uri = appendParamsToQuery(source.uri, queryParamMap);

    return (
      <Fragment>
        {error &&
        source &&
        source.uri &&
        !source.uri.includes("data:image/") ? (
          <Image
            {...this.props}
            source={
              source
                ? {
                    uri
                  }
                : null
            }
          />
        ) : null}
      </Fragment>
    );
  }
}

export default LazyLoadingImage;
