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
  itemContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  spacing: {
    flex: 1,
    maxWidth: 800,
    paddingLeft: 10,
    paddingRight: 10
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

  const paginationComponent = (hideResults = false) => (
    <Pagination
      count={count}
      hideResults={hideResults}
      generatePageLink={pageNum => `?page=${pageNum}`}
      onNext={onNext}
      onPrev={onPrev}
      page={page}
      pageSize={pageSize}
    />
  );

  return (
    <FlatList
      testID="scroll-view"
      accessibilityLabel="scroll-view"
      data={articles}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <AuthorProfileItem
          {...item}
          testID={`articleList-${index}`}
          style={styles.itemContainer}
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
            <View
              style={[
                styles.spacing,
                {
                  paddingBottom: 10
                }
              ]}
            >
              {paginationComponent()}
            </View>
          </View>
        </View>
      }
      ListFooterComponent={
        <View style={styles.container}>
          <View
            style={[
              styles.spacing,
              {
                paddingTop: 10
              }
            ]}
          >
            {paginationComponent(true)}
          </View>
        </View>
      }
      ItemSeparatorComponent={() => <AuthorProfileItemSeparator />}
    />
  );
};

AuthorProfileContent.propTypes = propTypes;
export default AuthorProfileContent;
