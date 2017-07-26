import React from "react";
import { FlatList, Linking, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileFooter from "./author-profile-footer";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10
  }
});

const AuthorProfile = props => {
  const headerProps = {
    ...props,
    onNext: () => Linking.openURL("https://www.thetimes.co.uk/"),
    onPrev: () => Linking.openURL("https://www.thetimes.co.uk/")
  };

  return (
    <FlatList
      containerStyle={styles.container}
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
