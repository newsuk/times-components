import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import AuthorHead from "@times-components/author-head";
import Pagination, { withPageState } from "@times-components/pagination";
import { ArticleListProvider } from "@times-components/provider";
import get from "lodash.get";
import AuthorProfileContent from "./author-profile-content";
import AuthorProfileEmpty from "./author-profile-empty";
import AuthorProfileError from "./author-profile-error";
import AuthorProfileLoading from "./author-profile-loading";

const AuthorProfile = ({
  isLoading,
  error,
  author,
  page: initPage,
  pageSize: initPageSize,
  onTwitterLinkPress,
  onArticlePress
}) => {
  if (error) {
    return <AuthorProfileError {...error} />;
  }

  if (isLoading) {
    return <AuthorProfileLoading />;
  }

  if (author && author.name) {
    const { biography, name, uri, jobTitle, twitter } = author;

    const styles = StyleSheet.create({
      container: {
        alignItems: "stretch",
        flexDirection: "row",
        justifyContent: "center"
      },
      spacing: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        maxWidth: 800
      }
    });

    const ArticleListProviderWithPageState = withPageState(ArticleListProvider);

    return (
      <View>
        <AuthorHead
          name={name}
          bio={biography}
          uri={uri}
          title={jobTitle}
          twitter={twitter}
          onTwitterLinkPress={onTwitterLinkPress}
        />
        <ArticleListProviderWithPageState
          page={initPage}
          pageSize={initPageSize}
        >
          {({
            author: data,
            onNext,
            onPrev,
            page,
            pageSize,
            isLoading,
            error
          }) =>
            <View>
              <View style={styles.container}>
                <View style={styles.spacing}>
                  <Pagination
                    count={get(data, "articles.count")}
                    generatePageLink={pageNum => `?page=${pageNum}`}
                    onNext={onNext}
                    onPrev={onPrev}
                    page={page}
                    pageSize={pageSize}
                  />
                </View>
              </View>
              <AuthorProfileContent
                articles={get(data, "articles.list", []).map(article => ({
                  ...article,
                  publishedTime: new Date(article.publishedTime)
                }))}
                onArticlePress={onArticlePress}
              />
            </View>}
        </ArticleListProviderWithPageState>
      </View>
    );
  }

  return <AuthorProfileEmpty />;
};

const {
  page,
  pageSize,
  onTwitterLinkPress,
  onArticlePress,
  ...author
} = AuthorProfileContent.propTypes;

AuthorProfile.propTypes = {
  author: PropTypes.shape(author),
  error: PropTypes.shape(),
  isLoading: PropTypes.bool,
  page,
  pageSize,
  // eslint doesnt follow the reference. AuthorProfileContent.propTypes.onTwitterLinkPress is actually marked as required.
  // eslint-disable-next-line react/require-default-props
  onTwitterLinkPress,
  // eslint-disable-next-line react/require-default-props
  onArticlePress
};

AuthorProfile.defaultProps = {
  author: null,
  error: null,
  isLoading: true,
  page: 1,
  pageSize: 10
};

export default AuthorProfile;
