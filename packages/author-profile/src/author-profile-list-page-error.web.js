import React from "react";
import Image from "@times-components/image";
import AuthorProfileListError from "./author-profile-list-error";
import propTypes from "./author-profile-list-error-prop-types";
import {
  PageErrorContainer,
  PageErrorImageContainer
} from "./styles/responsive";

const AuthorProfileListPageError = ({ refetch }) => (
  <PageErrorContainer>
    <AuthorProfileListError refetch={refetch} />
    <PageErrorImageContainer>
      <Image
        aspectRatio={700 / 770}
        uri="https://www.thetimes.co.uk/d/img/internal-error-c45d0e8347.png"
      />
    </PageErrorImageContainer>
  </PageErrorContainer>
);

AuthorProfileListPageError.propTypes = propTypes;

export default AuthorProfileListPageError;
