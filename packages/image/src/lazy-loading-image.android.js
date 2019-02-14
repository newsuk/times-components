import React, { Component, Fragment } from "react";
import { Image } from "react-native";
import appendToUrl from "./utils";

class LazyLoadingImage extends Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }

  render() {
    const { source } = this.props;
    const { error } = this.state;
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
                    uri: appendToUrl(source.uri, "offline", true)
                  }
                : null
            }
          />
        ) : null}
        <Image
          {...this.props}
          onError={({ nativeEvent: { error: imageError } }) => {
            this.setState({ error: imageError });
          }}
        />
      </Fragment>
    );
  }
}

export default LazyLoadingImage;
