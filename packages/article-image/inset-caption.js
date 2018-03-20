import React from "react";
import Caption from "@times-components/caption";
import { spacing } from "@times-components/styleguide";

const captionStyle = {
  container: {
    paddingLeft: 2 * spacing
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
