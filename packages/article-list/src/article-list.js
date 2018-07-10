import React, { Component } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Button from "@times-components/button";
import ErrorView from "@times-components/error-view";
import { colours } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import ArticleListError from "./article-list-error";
import ArticleListItem from "./article-list-item";
import ArticleListItemSeparator from "./article-list-item-separator";
import { propTypes, defaultProps } from "./article-list-prop-types";
import ArticleListEmptyState from "./article-list-empty-state";
import styles from "./styles";

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    this.fetchMoreOnEndReached = this.fetchMoreOnEndReached.bind(this);
    this.state = { loadMoreError: null, loadingMore: false };
  }

  componentWillUnmount() {
    global.cancelAnimationFrame(this.scrollAnimationFrame);
  }

  onViewableItemsChanged(info) {
    if (!info.changed.length) return [];

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(
        viewableItem =>
          this.props.onViewed &&
          this.props.onViewed(viewableItem.item, this.props.articles)
      );
  }

  fetchMoreOnEndReached(data) {
    if (this.state.loadMoreError || this.state.loadingMore) {
      return null;
    }

    this.setState({ loadingMore: true });
    return this.props
      .fetchMore(data.length)
      .then(() => this.setState({ loadingMore: false }))
      .catch(loadMoreError =>
        this.setState({ loadMoreError, loadingMore: false })
      );
  }

  render() {
    const {
      articleListHeader,
      articles,
      articlesLoading,
      count,
      emptyStateMessage,
      error,
      imageRatio,
      onArticlePress,
      pageSize,
      refetch,
      showImages
    } = this.props;

    if (error) {
      return (
        <View style={styles.listErrorContainer}>
          {articleListHeader}
          <View>
            <ArticleListError />
          </View>
          <Button onPress={refetch} style={styles.retryButton} title="Retry" />
        </View>
      );
    }

    const data = articlesLoading
      ? Array(pageSize)
          .fill()
          .map((number, index) => ({
            elementId: `empty.${index}`,
            id: index,
            isLoading: true
          }))
      : articles.map((article, index) => ({
          ...article,
          elementId: `${article.id}.${index}`
        }));

    if (!articlesLoading) this.props.receiveChildList(data);

    const articleListFooter = () => {
      if (data.length >= count) {
        return null;
      } else if (this.state.loadMoreError) {
        return (
          <View>
            <ArticleListItemSeparator />
            <View style={styles.showMoreRetryContainer}>
              <Button
                onPress={() => {
                  this.setState({ loadMoreError: null }, () =>
                    this.fetchMoreOnEndReached(data)
                  );
                }}
                style={styles.showMoreRetryButton}
                title="Retry"
              />
            </View>
          </View>
        );
      }
      return (
        <View>
          <ArticleListItemSeparator />
          <ActivityIndicator
            color={colours.functional.keyline}
            size="large"
            style={styles.loadingContainer}
          />
        </View>
      );
    };

    if (!articlesLoading && !error && data.length === 0) {
      return (
        <View style={styles.listEmptyStateContainer}>
          {articleListHeader}
          <ArticleListEmptyState message={emptyStateMessage} />
        </View>
      );
    }

    return (
      <FlatList
        accessibilityID="scroll-view"
        data={data}
        ItemSeparatorComponent={() => (
          <View style={styles.listItemSeparatorContainer}>
            <ArticleListItemSeparator />
          </View>
        )}
        keyExtractor={item => `${item.elementId}`}
        ListFooterComponent={articleListFooter}
        ListHeaderComponent={articleListHeader}
        onEndReached={() =>
          // Workaround for iOS Flatlist bug (https://github.com/facebook/react-native/issues/16067)
          data.length > 0 ? this.fetchMoreOnEndReached(data) : null
        }
        onEndReachedThreshold={2}
        onViewableItemsChanged={this.onViewableItemsChanged}
        pageSize={pageSize}
        renderItem={({ item, index }) => (
          <ErrorView>
            {({ hasError }) =>
              hasError ? null : (
                <ArticleListItem
                  {...item}
                  imageRatio={imageRatio}
                  index={index}
                  length={data.length}
                  onPress={e =>
                    onArticlePress(e, { id: item.id, url: item.url })
                  }
                  showImage={showImages}
                  testID={`articleList-${index}`}
                />
              )
            }
          </ErrorView>
        )}
        testID="scroll-view"
        viewabilityConfig={viewabilityConfig}
      />
    );
  }
}

ArticleList.propTypes = propTypes;
ArticleList.defaultProps = defaultProps;

export { default as ArticleListPageError } from "./article-list-page-error";
export { ArticleListEmptyState };
export default withTrackScrollDepth(ArticleList);
