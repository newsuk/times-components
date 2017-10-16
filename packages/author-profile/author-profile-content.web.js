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
  spacing: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    maxWidth: 800
  }
});

const itemStyles = StyleSheet.create({
  container: {
    maxWidth: 820,
    alignSelf: "center"
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
}) => (
  <View>
    <AuthorHead
      name={name}
      bio={biography}
      uri={uri}
      title={jobTitle}
      twitter={twitter}
      onTwitterLinkPress={onTwitterLinkPress}
    />

    <View>
      <View style={styles.container}>
        <View style={styles.spacing}>
          <Pagination
            count={count}
            generatePageLink={pageNum => `?page=${pageNum}`}
            onNext={onNext}
            onPrev={onPrev}
            page={page}
            pageSize={pageSize}
          />
        </View>
      </View>
      {articles &&
        articles.map((article, key) => {
          const { id, url } = article;
          const separatorComponent =
            key > 0 ? <AuthorProfileItemSeparator /> : null;

          return (
            <View key={id} style={itemStyles.container}>
              {separatorComponent}
              <AuthorProfileItem
                {...article}
                onPress={e => onArticlePress(e, { id, url })}
              />
            </View>
          );
        })}
      <View style={styles.container}>
        <View style={styles.spacing}>
          <Pagination
            count={count}
            generatePageLink={pageNum => `?page=${pageNum}`}
            onNext={onNext}
            onPrev={onPrev}
            page={page}
            pageSize={pageSize}
          />
        </View>
      </View>
    </View>
  </View>
);

AuthorProfileContent.propTypes = propTypes;
export default AuthorProfileContent;
