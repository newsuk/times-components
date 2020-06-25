import React from "react";
import Caption from "@times-components-native/caption";
import { spacing } from "@times-components-native/styleguide";

const captionStyle = {
  container: {
    paddingLeft: spacing(2)
  }
};

const CaptionComponentPrimaryNative = ({ caption, credits }) => (
  <Caption credits={credits} style={captionStyle} text={caption} />
);

CaptionComponentPrimaryNative.propTypes = {
  ...Caption.propTypes
};

CaptionComponentPrimaryNative.defaultProps = {
  ...Caption.defaultProps
};

export default CaptionComponentPrimaryNative;
