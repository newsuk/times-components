import React, { Fragment } from "react";
import { Image } from "react-native";
import appendToUrl from "./utils";

export default props => {
  const { source } = props;
  return (
    <Fragment>
      {source && source.uri && !source.uri.includes("data:image/") ? (
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
      ) : null}
      <Image {...props} />
    </Fragment>
  );
};
