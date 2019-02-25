import React from "react";
import { propTypes, defaultProps } from "./inset-caption-prop-types";
import { InsetCaptionStyle } from "./styles/responsive";

const InsetCaptionWeb = ({ text, credits, CaptionComponent }) => (
  <InsetCaptionStyle>
    <CaptionComponent credits={credits} text={text} />
  </InsetCaptionStyle>
);

InsetCaptionWeb.propTypes = propTypes;
InsetCaptionWeb.defaultProps = defaultProps;

export default InsetCaptionWeb;
