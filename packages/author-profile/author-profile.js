import React from "react";
import { FlatList, Linking } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const AuthorProfile = props => {
  const headerProps = {
    ...props,
    onNext: url => Linking.openURL(url),
    onPrev: url => Linking.openURL(url)
  };

  return (
    <FlatList
      data={props.currentPageOfArticles}
      ItemSeparatorComponent={() => <AuthorProfileItemSeparator />}
      keyExtractor={article => article.id}
      ListFooterComponent={() => <AuthorProfileFooter {...props} />}
      ListHeaderComponent={() => <AuthorProfileHeader {...headerProps} />}
      renderItem={({ item }) => <AuthorProfileItem {...item} />}
    />
  );
};

AuthorProfile.propTypes = {
  currentPageOfArticles: PropTypes.arrayOf(
    PropTypes.shape(AuthorProfileItem.propTypes)
  )
};

AuthorProfile.defaultProps = {
  currentPageOfArticles: []
};

export default AuthorProfile;
