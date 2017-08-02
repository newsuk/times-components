import React from "react";
import { FlatList, Linking } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const AuthorProfile = props => {
  const data = props.data;
  const headerProps = {
    ...data.author,
    count: data.author.articles.count,
    onNext: url => Linking.openURL(url),
    onPrev: url => Linking.openURL(url),
    pageSize: props.pageSize,
    page: props.page
  };

  return (
    <FlatList
      data={data.author.articles.list}
      ItemSeparatorComponent={() => <AuthorProfileItemSeparator />}
      keyExtractor={article => article.id}
      ListFooterComponent={() => <AuthorProfileFooter />}
      ListHeaderComponent={() => <AuthorProfileHeader {...headerProps} />}
      renderItem={({ item }) => <AuthorProfileItem {...item} />}
    />
  );
};

AuthorProfile.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  data: PropTypes.shape()
};

AuthorProfile.defaultProps = {
  page: 1,
  pageSize: 10,
  data: {
    loading: true
  }
};

export default AuthorProfile;
