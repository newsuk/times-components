import React from "react";
import { styleguide } from "@times-components/ts-components";
import Caption from "./caption";
import { defaultProps, propTypes } from "./caption-prop-types";

const { spacing } = styleguide();

const CentredCaption = ({ children, credits, style, text }) => (
  <Caption
    credits={credits}
    style={{
      ...style,
      text: {
        ...style.text,
        // TODO: put back after design signoff
        // marginTop: spacing(1),
        paddingHorizontal: spacing(2),
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
