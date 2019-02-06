import React, { Fragment } from "react";
import { Image } from "react-native";
import appendToUrl from "./utils";

export default props => {
  const { source } = props;
  return (
    <Fragment>
      <Image
        {...props}
        source={
          source
            ? {
                uri: appendToUrl(source.uri, "offline", true)
              }
            : null
        }
      />
      <Image {...props} />
    </Fragment>
  );
};
