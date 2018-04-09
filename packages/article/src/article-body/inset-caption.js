import React from "react";
import Caption from "@times-components/caption";
import { spacing } from "@times-components/styleguide";

const captionStyle = {
  container: {
    paddingLeft: spacing(2)
  }
};

const CaptionComponentPrimaryNative = ({ caption, credits }) => (
  <Caption text={caption} credits={credits} style={captionStyle} />
);

CaptionComponentPrimaryNative.propTypes = {
  ...Caption.propTypes
};

CaptionComponentPrimaryNative.defaultProps = {
  ...Caption.defaultProps
};

export default CaptionComponentPrimaryNative;
