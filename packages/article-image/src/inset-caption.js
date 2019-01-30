import React from "react";
import Caption from "@times-components/caption";
import { ResponsiveContext } from "@times-components/responsive";
import { spacing } from "@times-components/styleguide";

const captionStyle = {
  container: {
    paddingHorizontal: spacing(2)
  }
};

const CaptionComponentPrimaryNative = ({ caption, credits }) => (
  <ResponsiveContext>
    {({ isTablet }) => (
      <Caption
        credits={credits}
        style={!isTablet && captionStyle}
        text={caption}
      />
    )}
  </ResponsiveContext>
);

CaptionComponentPrimaryNative.propTypes = {
  ...Caption.propTypes
};
CaptionComponentPrimaryNative.defaultProps = {
  ...Caption.defaultProps
};

export default CaptionComponentPrimaryNative;
