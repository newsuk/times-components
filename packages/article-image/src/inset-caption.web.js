import React from "react";
import Caption, { propTypes, defaultProps } from "@times-components/caption";
import { InsetCaptionStyle } from "./styles/responsive";

const InsetCaptionWeb = ({ caption, credits }) => (
  <InsetCaptionStyle>
    <Caption credits={credits} text={caption} />
  </InsetCaptionStyle>
);

InsetCaptionWeb.propTypes = propTypes;
InsetCaptionWeb.defaultProps = defaultProps;

export default InsetCaptionWeb;
