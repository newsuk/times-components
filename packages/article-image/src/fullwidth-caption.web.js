import React from "react";
import Caption from "@times-components/caption";
import { propTypes, defaultProps } from "./fullwidth-caption-prop-types";
import { FullWidthCaptionStyle } from "./styles/responsive";

const FullWidthCaptionWeb = ({ text, credits }) => (
  <FullWidthCaptionStyle>
    <Caption credits={credits} text={text} />
  </FullWidthCaptionStyle>
);

FullWidthCaptionWeb.propTypes = propTypes;
FullWidthCaptionWeb.defaultProps = defaultProps;

export default FullWidthCaptionWeb;
