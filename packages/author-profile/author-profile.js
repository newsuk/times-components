import React from "react";
import PropTypes from "prop-types";
import AuthorProfileContent, {
  AuthorProfileContentWithTracking
} from "./author-profile-content";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileLoading from "./author-profile-loading";

const makeAuthorProfile = Content => {
  const AuthorProfile = props => {
    if (props.isLoading) {
      return <AuthorProfileLoading />;
    }

    if (props.error) {
      return <AuthorProfileError {...props.error} />;
    }

    if (!!props.data === true) {
      const extra = {
        onNext: props.onNext,
        onPrev: props.onPrev,
        page: props.page,
        pageSize: props.pageSize
      };
      return <Content {...props.data} {...extra} />;
    }

    return <AuthorProfileEmpty />;
  };

  AuthorProfile.propTypes = {
    data: PropTypes.shape(Content.propTypes),
    error: PropTypes.shape(),
    isLoading: PropTypes.bool,
    onNext: Content.propTypes.onNext,
    onPrev: Content.propTypes.onPrev,
    page: Content.propTypes.page,
    pageSize: Content.propTypes.pageSize
  };

  AuthorProfile.defaultProps = {
    data: null,
    error: null,
    isLoading: true,
    onNext: () => {},
    onPrev: () => {},
    page: 1,
    pageSize: 10
  };

  return AuthorProfile;
};

export const AuthorProfileWithTracking = makeAuthorProfile(
  AuthorProfileContentWithTracking
);

export default makeAuthorProfile(AuthorProfileContent);
