import React from "react";
import Caption from "./caption";
import { defaultProps, propTypes } from "./caption-prop-types";

const CentredCaption = ({ children, credits, style, text }) => (
  <Caption
    credits={credits}
    style={{
      ...style,
      text: {
        ...style.text,
        textAlign: "center"
      }
    }}
    text={text}
  >
    {children}
  </Caption>
);

CentredCaption.propTypes = propTypes;
CentredCaption.defaultProps = defaultProps;

export default CentredCaption;
