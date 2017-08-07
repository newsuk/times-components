import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileData from "./author-profile-data";

const AuthorProfile = props => {
  const data = props.data;
  if (data.loading) {
    return <Text>Loading</Text>;
  }

  return <AuthorProfileData {...props} />;
};

AuthorProfile.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.boolean
  })
};

AuthorProfile.defaultProps = {
  data: {
    loading: true
  }
};

export default AuthorProfile;
