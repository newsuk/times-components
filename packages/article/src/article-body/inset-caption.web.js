import React from "react";
import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";

import Caption from "@times-components/caption";

const InsetCaptionStyle = withResponsiveStyles(
  View,
  {
    base: () => `padding-left: ${spacing(2)};`,
    mediumUp: () => "padding-left: 0px;"
  },
  "InsetCaptionStyle"
);

const InsetCaptionWeb = props => (
  <InsetCaptionStyle>
    <Caption text={props.caption} credits={props.credits} />
  </InsetCaptionStyle>
);

InsetCaptionWeb.propTypes = {
  ...Caption.propTypes
};

InsetCaptionWeb.defaultProps = {
  ...Caption.defaultProps
};

export default InsetCaptionWeb;
