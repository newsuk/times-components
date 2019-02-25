import React from "react";
import {
  CentredCaption,
  propTypes,
  defaultProps
} from "@times-components/caption";
import InsetCaption from "./inset-caption";

const InsetCenteredCaption = props => (
  <InsetCaption {...props} CaptionComponent={CentredCaption} />
);

InsetCenteredCaption.propTypes = propTypes;
InsetCenteredCaption.defaultProps = defaultProps;

export default InsetCenteredCaption;
