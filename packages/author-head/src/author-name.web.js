import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const AuthorNameWrapper = withResponsiveStyles(Text, {
  base: () => `
    font-family: ${fonts.headline};
    font-size: ${fontSizes.headline}px;
    color: ${colours.functional.brandColour};
  `,
  mediumUp: () => `font-size: ${fontSizes.articleHeadline}px;`
});

const AuthorName = ({ name }) => (
  <AuthorNameWrapper
    testID="author-name"
    accessibilityLabel="author-name"
    accessibilityRole="heading"
    aria-level="1"
  >
    {name}
  </AuthorNameWrapper>
);

AuthorName.propTypes = {
  name: PropTypes.string.isRequired
};

export default AuthorName;
