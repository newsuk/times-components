import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import withResponsiveStyles from "@times-components/responsive-styles";
import AuthorProfileListError from "./author-profile-list-error";

const ErrorContainer = withResponsiveStyles(View, {
  base: () => `
    flex: 1;
    justify-content: space-between;
    flex-direction: column-reverse;
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
  `,
  mediumUp: () => `
    padding-left: 15%;
    padding-right: 15%;
  `,
  wideUp: () => `
    flex-direction: row;
  `
});

const ImageContainer = withResponsiveStyles(View, {
  base: () => `
    max-width: 75%;
    width: 100%;
    flex-basis: 50% !important;
    align-self: center;
  `,
  mediumUp: () => `
    max-width: 428px;
  `,
  wideUp: () => `
    max-width: none;
  `
});

const AuthorProfileError = ({ refetch }) => (
  <ErrorContainer>
    <AuthorProfileListError refetch={refetch} />
    <ImageContainer>
      <Image
        aspectRatio={700 / 770}
        uri="https://www.thetimes.co.uk/d/img/internal-error-c45d0e8347.png"
      />
    </ImageContainer>
  </ErrorContainer>
);

AuthorProfileError.propTypes = {
  refetch: PropTypes.func.isRequired
};

export default AuthorProfileError;
