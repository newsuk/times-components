import React from "react";
import CaptionShared from "./shared";

const defaultStyle = {
  text: {
    lineHeight: 17
  },
  credits: {
    lineHeight: 17
  }
};

const Caption = props =>
  <CaptionShared {...props} style={{ ...defaultStyle, ...props.style }} />;

Caption.propTypes = CaptionShared.propTypes;

export default Caption;
