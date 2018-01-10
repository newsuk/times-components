import React from "react";

import Caption from "@times-components/caption";

const captionStyle = {
  priamry: {
    container: {
      paddingLeft: 10
    }
  },
  inline: {}
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
