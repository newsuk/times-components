import React from "react";
import { FlatList } from "react-native";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const AuthorProfile = props =>
  <FlatList
    data={props.currentPageOfArticles}
    ItemSeparatorComponent={() => <AuthorProfileItemSeparator />}
    keyExtractor={article => article.id}
    ListFooterComponent={() => <AuthorProfileFooter {...props} />}
    ListHeaderComponent={() => <AuthorProfileHeader {...props} />}
    renderItem={({ item }) => <AuthorProfileItem {...item} />}
  />;

AuthorProfile.propTypes = Object.assign(
  {},
  AuthorProfileFooter.propTypes,
  AuthorProfileHeader.propTypes,
  AuthorProfileItem.propTypes
);

export default AuthorProfile;
