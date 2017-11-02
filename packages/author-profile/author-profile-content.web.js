import React from "react";
import { StyleSheet, View } from "react-native";
import AuthorProfileAuthorHead from "./author-profile-author-head";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import AuthorProfilePagination from "./author-profile-pagination";
import propTypes from "./author-profile-content-prop-types";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10
  },
  contentContainer: {
    maxWidth: 680,
    alignSelf: "center",
    width: "100%"
  }
});

const AuthorProfileContent = ({
  articles,
  articlesLoading,
  biography,
  count,
  jobTitle,
  isLoading,
  name,
  onArticlePress,
  onNext,
  onPrev,
  onTwitterLinkPress,
  page,
  pageSize,
  twitter,
  uri
}) => {
  const paginationComponent = (hideResults = false) => (
    <AuthorProfilePagination
      count={count}
      hideResults={hideResults}
      onNext={onNext}
      onPrev={onPrev}
      page={page}
      pageSize={pageSize}
    />
  );

  const data = articlesLoading
    ? Array(pageSize)
        .fill()
        .map((number, id) => ({
          id,
          isLoading: true
        }))
    : articles;

  return (
    <View>
      <AuthorProfileAuthorHead
        isLoading={isLoading}
        name={name}
        bio={biography}
        uri={uri}
        title={jobTitle}
        twitter={twitter}
        onTwitterLinkPress={onTwitterLinkPress}
      />
      <View style={styles.contentContainer}>
        {paginationComponent()}
        <View style={styles.container}>
          {data &&
            data.map((article, key) => {
              const { id, url } = article;
              const separatorComponent =
                key > 0 ? <AuthorProfileItemSeparator /> : null;

              return (
                <View key={id} testID={`articleList-${key}`}>
                  {separatorComponent}
                  <AuthorProfileItem
                    {...article}
                    onPress={e => onArticlePress(e, { id, url })}
                  />
                </View>
              );
            })}
        </View>
        {paginationComponent(true)}
      </View>
    </View>
  );
};

AuthorProfileContent.propTypes = propTypes;
export default AuthorProfileContent;
