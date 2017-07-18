import React from "react";
import { View } from "react-native";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";

const AuthorProfile = props =>
  <View>
    <AuthorProfileHeader {...props} />
    {props.currentPageOfArticles.map(item => <AuthorProfileItem {...item} />)}
    <AuthorProfileFooter {...props} />
  </View>;

AuthorProfile.propTypes = Object.assign(
  {},
  AuthorProfileFooter.propTypes,
  AuthorProfileHeader.propTypes,
  AuthorProfileItem.propTypes
);

export default AuthorProfile;
