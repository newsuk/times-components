import React from "react";
import { StyleSheet, View } from "react-native";
import Pagination from "@times-components/pagination";
import AuthorHead from "@times-components/author-head";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import propTypes from "./author-profile-content-prop-types";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  contentContainer: {
    maxWidth: 800,
    alignSelf: "center",
    width: "100%"
  },
  spacing: {
    flex: 1
  }
});

const itemStyles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10
  }
});

const AuthorProfileContent = ({
  name,
  biography,
  uri,
  jobTitle,
  twitter,
  onTwitterLinkPress,
  count,
  onNext,
  onPrev,
  page,
  pageSize,
  articles,
  onArticlePress
}) => {
  const paginationComponent = (hideResults = false) => (
    <View style={styles.container}>
      <View style={styles.spacing}>
        <Pagination
          count={count}
          hideResults={hideResults}
          generatePageLink={pageNum => `?page=${pageNum}`}
          onNext={onNext}
          onPrev={onPrev}
          page={page}
          pageSize={pageSize}
        />
      </View>
    </View>
  );

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
      <View style={styles.contentContainer}>
        {paginationComponent()}
        <View style={itemStyles.container}>
          {articles &&
            articles.map((article, key) => {
              const { id, url } = article;
              const separatorComponent =
                key > 0 ? <AuthorProfileItemSeparator /> : null;

              return (
                <View
                  key={id}
                  accessibilityLabel={`articleList-${key}`}
                  testID={`articleList-${key}`}
                >
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
