import React from "react";
import { ResponsiveContext } from "@times-components/responsive";
import { spacing } from "@times-components/styleguide";
import { propTypes, defaultProps } from "./inset-caption-prop-types";

const captionStyle = {
  container: {
    paddingHorizontal: spacing(2)
  }
};

const CaptionComponentPrimaryNative = ({ text, credits, CaptionComponent }) => (
  <ResponsiveContext>
    {({ isTablet }) => (
      <CaptionComponent
        credits={credits}
        style={isTablet ? {} : captionStyle}
        text={text}
      />
    )}
  </ResponsiveContext>
);

CaptionComponentPrimaryNative.propTypes = propTypes;
CaptionComponentPrimaryNative.defaultProps = defaultProps;

export default CaptionComponentPrimaryNative;
