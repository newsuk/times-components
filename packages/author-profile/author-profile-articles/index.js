import get from "lodash.get";
import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import { AuthorProfileProvider } from "@times-components/provider";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import AuthorProfileLoading from "./author-profile-item-loading";

const render = list => (
  <View>
    {list.map(({ loading, ...item }, key) => {
      const separatorComponent =
        key > 0 ? <AuthorProfileItemSeparator /> : null;

      const itemComponent = loading ? (
        <AuthorProfileLoading />
      ) : (
        <AuthorProfileItem key={item.id} {...item} />
      );

      return (
        <View key={item.id}>
          {separatorComponent}
          {itemComponent}
        </View>
      );
    })}
  </View>
);

const AuthorProfileArticlesList = ({ author, error, loading, pageSize }) => {
  if (error) {
    return <AuthorProfileError />;
  }

  const list = get(author, "articles.list", []).map(article =>
    Object.assign({}, article, {
      publishedTime: new Date(article.publishedTime)
    })
  );

  if (loading) {
    return render(
      Array(pageSize)
        .fill()
        .map((_, id) => ({ id, loading: true }))
    );
  }

  if (list.length === 0) {
    return <AuthorProfileEmpty />;
  }

  return render(list);
};

AuthorProfileArticlesList.propTypes = {
  author: PropTypes.shape(),
  error: PropTypes.shape(),
  loading: PropTypes.bool,
  pageSize: PropTypes.number
};

AuthorProfileArticlesList.defaultProps = {
  author: null,
  error: null,
  loading: false,
  pageSize: 20
};

const AuthorProfileArticles = props => (
  <AuthorProfileProvider {...props}>
    {AuthorProfileArticlesList}
  </AuthorProfileProvider>
);

export default AuthorProfileArticles;
