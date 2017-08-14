import React from "react";
import { ScrollView, View } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileHeader from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const AuthorProfile = props =>
  <ScrollView>
    <AuthorProfileHeader {...props} />
    {props.articles.list.map((item, key) => {
      const separatorComponent = key > 0
        ? <AuthorProfileItemSeparator />
        : null;

      return (
        <View key={item.id}>
          {separatorComponent}
          <AuthorProfileItem {...item} />
        </View>
      );
    })}
  </ScrollView>;

AuthorProfile.propTypes = Object.assign(
  {
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
    })
  },
  AuthorProfileHeader.propTypes
);

export default AuthorProfile;
