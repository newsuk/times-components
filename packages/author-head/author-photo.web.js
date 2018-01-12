import React from "react";
import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import AuthorPhotoBase from "./author-photo.base";

const ImageContainer = withResponsiveStyles(View, {
  base: () => `
    width: 100px;
  `,
  mediumUp: () => `
    width: 116px;
  `
});

const AuthorPhoto = props => (
  <ImageContainer>
    <AuthorPhotoBase
      {...props}
      style={{ width: "100%", borderRadius: "50%" }}
    />
  </ImageContainer>
);

export default AuthorPhoto;
