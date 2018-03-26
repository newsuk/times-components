import React from "react";
import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { spacing } from "@times-components/styleguide";
import Bio from "./author-bio.base";

const BioContainer = withResponsiveStyles(View, {
  base: () => `
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};
  `,
  mediumUp: () => `
    padding-left: 0;
    padding-right: 0;
    max-width: 680px
  `,
  hugeUp: () => "max-width: 760px"
});

export default props => (
  <BioContainer>
    <Bio {...props} />
  </BioContainer>
);
