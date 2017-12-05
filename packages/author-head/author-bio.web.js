import React from "react";
import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import Bio from "./author-bio.base";

const BioContainer = withResponsiveStyles(View, {
  base: () => `
    max-width: 88%;
    padding-bottom: 32px;
  `,
  toMedium: () => "max-width: 680px",
  toHuge: () => "max-width: 760px"
});

export default props => (
  <BioContainer>
    <Bio {...props} />
  </BioContainer>
);
