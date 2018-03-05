import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import withResponsiveStyles from "@times-components/responsive-styles";
import { colours } from "@times-components/styleguide";

const AuthorNameWrapper = withResponsiveStyles(Text, {
  base: () => `
    font-family: TimesModern-Bold;
    font-size: 30px;
    color: ${colours.functional.brandColour};
  `,
  mediumUp: () => "font-size: 45px;"
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
