import React, { Component } from "react";
import { FlatList, View } from "react-native";
import ErrorView from "@times-components/error-view";
import { withTrackScrollDepth } from "@times-components/tracking";
import ArticleListError from "./article-list-error";
import ArticleListItem from "./article-list-item";
import ArticleListItemSeparator from "./article-list-item-separator";
import ArticleListPagination from "./article-list-pagination";
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
      onNext,
      onPrev,
      page,
      pageSize,
      refetch,
      showImages
    } = this.props;

    if (error) {
      return (
        <View style={styles.listErrorContainer}>
          {articleListHeader}
          <ArticleListError refetch={refetch} />
        </View>
      );
    }

    const scrollToTopNextFrame = () => {
      this.scrollAnimationFrame = global.requestAnimationFrame(() => {
        this.listRef.scrollToOffset({
          animated: true,
          offset: 0
        });
      });
    };

    const paginationComponent = (
      { autoScroll = false, hideResults = false } = {}
    ) => (
      <ArticleListPagination
        count={count}
        hideResults={hideResults}
        onNext={(...args) => {
          onNext(...args);
          if (autoScroll) scrollToTopNextFrame();
        }}
        onPrev={(...args) => {
          onPrev(...args);
          if (autoScroll) scrollToTopNextFrame();
        }}
        page={page}
        pageSize={pageSize}
      />
    );

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

    return (
      <FlatList
        accessibilityID="scroll-view"
        data={data}
        keyExtractor={item => `${item.id}`}
        onViewableItemsChanged={this.onViewableItemsChanged}
        pageSize={pageSize}
        ref={list => {
          this.listRef = list;
        }}
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
        ListFooterComponent={paginationComponent({
          autoScroll: true,
          hideResults: true
        })}
        ListHeaderComponent={
          <View>
            {articleListHeader}
            {paginationComponent({ autoScroll: false, hideResults: false })}
          </View>
        }
      />
    );
  }
}

ArticleList.propTypes = propTypes;
ArticleList.defaultProps = defaultProps;

export default withTrackScrollDepth(ArticleList);
export { default as ArticleListPageError } from "./article-list-page-error";
