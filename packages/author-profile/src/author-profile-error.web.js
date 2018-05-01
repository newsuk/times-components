import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import AuthorProfileListError from "./author-profile-list-error";
import { ErrorContainer, ImageContainer } from "./styles/responsive";

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
