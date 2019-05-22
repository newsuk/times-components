import React, { Component } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Button from "@times-components/button";
import { colours, tabletWidth } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import {
  normaliseWidthForAssetRequestCache,
  screenWidthInPixels
} from "@times-components/utils";
import ArticleListError from "./article-list-error";
import ArticleListItemWithError from "./article-list-item-with-error";
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
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      loadingMore: false,
      loadMoreError: null,
      width: normaliseWidthForAssetRequestCache(screenWidthInPixels())
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { articles } = this.props;
    const { articles: nextArticles } = nextProps;
    return (
      !articles ||
      !nextArticles ||
      articles !== nextArticles ||
      articles.length !== nextArticles.length ||
      this.state !== nextState
    );
  }

  componentWillUnmount() {
    global.cancelAnimationFrame(this.scrollAnimationFrame);
  }

  onViewableItemsChanged(info) {
    const { articles, onViewed } = this.props;
    if (!info.changed.length) return [];

    return info.changed
      .filter(viewableItem => viewableItem.isViewable)
      .map(viewableItem => onViewed(viewableItem.item, articles));
  }

  fetchMoreOnEndReached(data) {
    const { fetchMore } = this.props;
    const { loadingMore, loadMoreError } = this.state;
    if (loadMoreError || loadingMore) {
      return null;
    }

    this.setState({ loadingMore: true });

    return new Promise((res, rej) =>
      fetchMore(data.length)
        .then(() => this.setState({ loadingMore: false }, res))
        .catch(error =>
          this.setState(
            {
              loadingMore: false,
              loadMoreError: error
            },
            rej
          )
        )
    );
  }

  renderItem({ item, index }) {
    const {
      articles,
      articlesLoading,
      imageRatio,
      onArticlePress,
      pageSize,
      showImages
    } = this.props;
    const { width } = this.state;

    return (
      <ArticleListItemWithError
        article={item.isLoading ? null : item}
        highResSize={width}
        imageRatio={imageRatio}
        index={index}
        isLoading={item.isLoading === true}
        length={articlesLoading ? pageSize : articles.length}
        onPress={onArticlePress}
        showImage={showImages}
        testID={`articleList-${index}`}
      />
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
      onViewed,
      pageSize,
      receiveChildList,
      refetch
    } = this.props;
    const { loadMoreError } = this.state;

    if (error) {
      return (
        <View style={styles.listErrorContainer}>
          {articleListHeader}
          <View>
            <ArticleListError />
          </View>
          <Button onPress={refetch} title="Retry" />
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

    if (!articlesLoading) receiveChildList(data);

    const articleListFooter = () => {
      if (data.length >= count) {
        return null;
      }
      if (loadMoreError) {
        return (
          <View>
            <ArticleListItemSeparator />
            <View style={styles.showMoreRetryContainer}>
              <Button
                onPress={() =>
                  new Promise((res, rej) => {
                    this.setState({ loadMoreError: null }, () =>
                      this.fetchMoreOnEndReached(data)
                        .then(res)
                        .catch(rej)
                    );
                  })
                }
                title="Retry"
              />
            </View>
          </View>
        );
      }

      return (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ flex: 1, maxWidth: tabletWidth }}>
            <ArticleListItemSeparator />
            <ActivityIndicator
              color={colours.functional.keyline}
              size="large"
              style={styles.loadingContainer}
            />
          </View>
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
        removeClippedSubviews
        accessibilityID="scroll-view"
        data={data}
        ItemSeparatorComponent={() => (
          <View style={styles.listItemSeparatorContainer}>
            <ArticleListItemSeparator />
          </View>
        )}
        keyExtractor={item => item.elementId}
        ListFooterComponent={articleListFooter}
        ListHeaderComponent={articleListHeader}
        nestedScrollEnabled
        onEndReached={() =>
          // Workaround for iOS Flatlist bug (https://github.com/facebook/react-native/issues/16067)
          data.length > 0 ? this.fetchMoreOnEndReached(data) : null
        }
        onEndReachedThreshold={2}
        onViewableItemsChanged={onViewed ? this.onViewableItemsChanged : null}
        renderItem={this.renderItem}
        testID="scroll-view"
        viewabilityConfig={viewabilityConfig}
        windowSize={5}
      />
    );
  }
}

ArticleList.propTypes = propTypes;
ArticleList.defaultProps = defaultProps;

export { default as ArticleListPageError } from "./article-list-page-error";
export { ArticleListEmptyState };
export default withTrackScrollDepth(ArticleList);
