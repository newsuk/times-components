import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";

import Caption from "@times-components/caption";

// SHOULD BE IN STYLES
const InsetCaptionStyle = styled(View)`
  padding-left: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0px;
  }
`;

const InsetCaptionWeb = props => (
  <InsetCaptionStyle>
    <Caption credits={props.credits} text={props.caption} />
  </InsetCaptionStyle>
);

InsetCaptionWeb.propTypes = {
  ...Caption.propTypes
};

InsetCaptionWeb.defaultProps = {
  ...Caption.defaultProps
};

export default InsetCaptionWeb;
