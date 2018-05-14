import React, { Component } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import ErrorView from "@times-components/error-view";
import { withTrackScrollDepth } from "@times-components/tracking";
import ArticleListError from "./article-list-error";
import ArticleListItem from "./article-list-item";
import ArticleListItemSeparator from "./article-list-item-separator";
import ArticleListRetryButton from "./article-list-retry-button";
import { propTypes, defaultProps } from "./article-list-prop-types";
import styles from "./styles";

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    this.state = { loadMoreError: null };
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

  render() {
    const {
      articleListHeader,
      articles,
      articlesLoading,
      count,
      error,
      imageRatio,
      onArticlePress,
      pageSize,
      refetch,
      showImages,
      fetchMore,
      updateQuery
    } = this.props;

    if (error) {
      return (
        <View style={styles.listErrorContainer}>
          {articleListHeader}
          <ArticleListError refetch={refetch} />
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

    const fetchMoreOnEndReached = () => {
      if (this.state.loadMoreError) {
        return;
      }

      fetchMore({
        variables: {
          skip: data.length
        },
        updateQuery
      }).catch(err => this.setState({ loadMoreError: err }));
    };

    return (
      <FlatList
        accessibilityID="scroll-view"
        data={data}
        keyExtractor={item => `${item.elementId}`}
        onViewableItemsChanged={this.onViewableItemsChanged}
        pageSize={pageSize}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreOnEndReached}
        renderItem={({ item, index }) => (
          <ErrorView>
            {({ hasError }) =>
              hasError ? null : (
                <ArticleListItem
                  {...item}
                  imageRatio={imageRatio}
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
        scrollRenderAheadDistance={2}
        testID="scroll-view"
        viewabilityConfig={viewabilityConfig}
        ItemSeparatorComponent={() => (
          <View style={styles.listItemSeparatorContainer}>
            <ArticleListItemSeparator />
          </View>
        )}
        ListFooterComponent={() => {
          if (data.length >= count) {
            return null;
          } else if (this.state.loadMoreError) {
            return (
              <ArticleListRetryButton
                refetch={() => {
                  this.setState({ loadMoreError: null });
                }}
              />
            );
          }
          return (
            <ActivityIndicator style={styles.loadingContainer} size="large" />
          );
        }}
        ListHeaderComponent={articleListHeader}
      />
    );
  }
}

ArticleList.propTypes = propTypes;
ArticleList.defaultProps = defaultProps;

export default withTrackScrollDepth(ArticleList);
export { default as ArticleListPageError } from "./article-list-page-error";
