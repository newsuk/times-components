import React from "react";
import { FlatList, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const styles = StyleSheet.create({
  margin: 8
});

const AuthorProfile = props =>
  <FlatList
    style={styles.container}
    data={props.currentPageOfArticles}
    ItemSeparatorComponent={() => <AuthorProfileItemSeparator />}
    keyExtractor={article => article.id}
    ListFooterComponent={() => <AuthorProfileFooter {...props} />}
    ListHeaderComponent={() => <AuthorProfileHeader {...props} />}
    renderItem={({ item }) => <AuthorProfileItem {...item} />}
  />;

AuthorProfile.propTypes = {
  currentPageOfArticles: PropTypes.arrayOf(AuthorProfileItem.propTypes)
};

AuthorProfile.defaultProps = {
  currentPageOfArticles: []
};

export default AuthorProfile;
