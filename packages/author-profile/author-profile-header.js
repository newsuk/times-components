import React from "react";
import { Text, View } from "react-native";
import AuthorHead from "@times-components/author-head";

const AuthorProfileHeader = ({
  articleCount,
  biography,
  currentPageOffset,
  name,
  image,
  jobTitle,
  twitter,
  pageSize
}) => {
  const props = {
    bio: biography,
    name,
    uri: image,
    title: jobTitle,
    twitter
  };

  return (
    <View>
      <AuthorHead {...props} />
      <Text>{articleCount} {currentPageOffset} {pageSize}</Text>
    </View>
  );
};

AuthorProfileHeader.propTypes = Object.assign({}, AuthorHead.propTypes);

export default AuthorProfileHeader;
