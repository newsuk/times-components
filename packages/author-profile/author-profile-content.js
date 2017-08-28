import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import AuthorProfileLoading from "./author-profile-loading";

const AuthorProfile = props => {
  if (props.isLoading) {
    return <AuthorProfileLoading />;
  }

  if (props.error) {
    return <AuthorProfileError {...props.error} />;
  }

  if (!!props.data === true) {
    return (
      <View>
        {props.data.articles.list.map((item, key) => {
          const separatorComponent =
            key > 0 ? <AuthorProfileItemSeparator /> : null;

          return (
            <View key={item.id}>
              {separatorComponent}
              <AuthorProfileItem {...item} />
            </View>
          );
        })}
      </View>
    );
  }

  return <AuthorProfileEmpty />;
}

AuthorProfile.defaultProps = {
  data: null,
  error: null,
  isLoading: true
};

AuthorProfile.propTypes = {
  data: PropTypes.shape({
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape(AuthorProfileItem.propTypes))
    })
  }),
  error: PropTypes.shape(),
  isLoading: PropTypes.bool,
};

export default AuthorProfile;
