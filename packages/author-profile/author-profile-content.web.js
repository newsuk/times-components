import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import _round from "lodash.round";
import { addTracking } from "@times-components/tracking";
import AuthorProfileHeader, {
  AuthorProfileHeaderWithTracking
} from "./author-profile-header";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";

const styles = StyleSheet.create({
  container: {
    maxWidth: 820,
    alignSelf: "center"
  }
});

const makeAuthorProfileContent = Header => {
  const AuthorProfile = props => (
    <View>
      <Header {...props} />
      {props.articles.list.map((item, key) => {
        const separatorComponent =
          key > 0 ? <AuthorProfileItemSeparator /> : null;

        return (
          <View key={item.id} style={styles.container}>
            {separatorComponent}
            <AuthorProfileItem {...item} />
          </View>
        );
      })}
    </View>
  );

  AuthorProfile.propTypes = Object.assign(
    {
      articles: PropTypes.shape({
        list: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
      })
    },
    Header.propTypes
  );

  return AuthorProfile;
};

export const AuthorProfileContentWithTracking = addTracking(
  makeAuthorProfileContent(AuthorProfileHeaderWithTracking),
  {
    trackChildViews: {
      id: "id",
      attrs: {
        index: props => props.index,
        progress: props => _round((props.index + 1) / props.total * 100, 2)
      },
      listPath: "articles.list"
    }
  }
);

export default makeAuthorProfileContent(AuthorProfileHeader);
