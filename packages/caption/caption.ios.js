import React from "react";
import CaptionShared from "./shared";

const defaultStyle = {
  text: {
    lineHeight: 16
  },
  credits: {
    lineHeight: 16
  }
};

const Caption = props =>
  <CaptionShared {...props} style={{ ...defaultStyle, ...props.style }} />;

Caption.propTypes = CaptionShared.propTypes;

export default Caption;
