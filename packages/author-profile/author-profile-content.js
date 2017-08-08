import React from "react";
import { FlatList } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const AuthorProfile = props =>
  <FlatList
    data={props.articles.list}
    ItemSeparatorComponent={() => <AuthorProfileItemSeparator />}
    keyExtractor={article => article.id}
    ListHeaderComponent={() => <AuthorProfileHeader {...props} />}
    renderItem={({ item }) => <AuthorProfileItem {...item} />}
  />;

AuthorProfile.propTypes = Object.assign(
  {
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
    })
  },
  AuthorProfileHeader.propTypes
);

export default AuthorProfile;
