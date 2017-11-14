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

  render() {
    const { count } = this.state;

    const {
      isLoading,
      articles,
      articlesLoading,
      biography,
      jobTitle,
      name,
      onArticlePress,
      onNext,
      onPrev,
      onTwitterLinkPress,
      page,
      pageSize,
      twitter,
      uri
    } = this.props;

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
      <FlatList
        testID="scroll-view"
        accessibilityLabel="scroll-view"
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <AuthorProfileItem
            {...item}
            style={styles.padding}
            testID={`articleList-${index}`}
            onPress={e => onArticlePress(e, { id: item.id, url: item.url })}
          />
        )}
        initialListSize={pageSize}
        scrollRenderAheadDistance={2}
        pageSize={pageSize}
        ListHeaderComponent={
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
            {paginationComponent()}
          </View>
        }
        ListFooterComponent={paginationComponent(true)}
        ItemSeparatorComponent={() => (
          <View style={styles.padding}>
            <AuthorProfileItemSeparator />
          </View>
        )}
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
