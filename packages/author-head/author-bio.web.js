import React from "react";
import { View } from "react-native";
import Bio from "./author-bio.base";
import withResponsiveStyles from "./responsive-styles";

const BioContainer = withResponsiveStyles(View, {
  base: () => `
    max-width: 88%;
    padding-bottom: 32px;
  `,
  medium: () => "max-width: 680px",
  huge: () => "max-width: 760px"
});

export default props => (
  <BioContainer>
    <Bio {...props} />
  </BioContainer>
);
