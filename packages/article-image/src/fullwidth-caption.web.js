import React from "react";
import { propTypes, defaultProps } from "./fullwidth-caption-prop-types";
import { FullWidthCaptionStyle } from "./styles/responsive";

const FullWidthCaptionWeb = ({ text, credits, CaptionComponent }) => (
  <FullWidthCaptionStyle>
    <CaptionComponent credits={credits} text={text} />
  </FullWidthCaptionStyle>
);

FullWidthCaptionWeb.propTypes = propTypes;
FullWidthCaptionWeb.defaultProps = defaultProps;

export default FullWidthCaptionWeb;
