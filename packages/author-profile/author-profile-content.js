import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AuthorHead from "@times-components/author-head";
import Pagination from "@times-components/pagination";
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

const AuthorProfileContent = props => {
  const {
    name,
    articles,
    count,
    biography,
    uri,
    jobTitle,
    twitter,
    onTwitterLinkPress,
    onNext,
    onPrev,
    page,
    pageSize,
    onArticlePress
  } = props;

  return (
    <FlatList
      data={articles}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <AuthorProfileItem
          {...item}
          onPress={e => onArticlePress(e, { id: item.id, url: item.url })}
        />
      )}
      initialListSize={pageSize}
      scrollRenderAheadDistance={2}
      pageSize={pageSize}
      ListHeaderComponent={
        <View>
          <AuthorHead
            name={name}
            bio={biography}
            uri={uri}
            title={jobTitle}
            twitter={twitter}
            onTwitterLinkPress={onTwitterLinkPress}
          />
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
      }
      ItemSeparatorComponent={() => <AuthorProfileItemSeparator />}
    />
  );
};

AuthorProfileContent.propTypes = propTypes;
export default AuthorProfileContent;
