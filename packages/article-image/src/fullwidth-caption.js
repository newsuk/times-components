import React from "react";
import Caption from "@times-components/caption";
import { propTypes, defaultProps } from "./fullwidth-caption-prop-types";
import { FullWidthCaptionContainer } from "./styles/responsive";

const FullWidthCaptionWeb = props => (
  <FullWidthCaptionContainer>
    <Caption {...props} />
  </FullWidthCaptionContainer>
);

FullWidthCaptionWeb.propTypes = propTypes;
FullWidthCaptionWeb.defaultProps = defaultProps;

export default FullWidthCaptionWeb;
