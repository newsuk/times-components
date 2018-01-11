import React from "react";
import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import AuthorHeadContainerBase from "./author-head-container.base";

const AuthorHeadWrapper = withResponsiveStyles(View, {
  base: () => `
    padding-top: 30px;
  `,
  mediumUp: () => `
    padding-top: 60px;
  `
});

const AuthorHeadContainer = props => (
  <AuthorHeadContainerBase {...props} WrapperComponent={AuthorHeadWrapper} />
);

export default AuthorHeadContainer;
