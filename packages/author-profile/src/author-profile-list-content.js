import React, { Component } from "react";
import { FlatList, View } from "react-native";
import AuthorHead from "@times-components/author-head";
import ErrorView from "@times-components/error-view";
import { withTrackScrollDepth } from "@times-components/tracking";
import AuthorProfileListPagination from "./author-profile-list-pagination";
import AuthorProfileListItem from "./author-profile-list-item";
import AuthorProfileListItemSeparator from "./author-profile-list-item-separator";
import AuthorProfileListError from "./author-profile-list-error";
import {
  propTypes,
  defaultProps
} from "./author-profile-list-content-prop-types";
import styles from "./styles";

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

class AuthorProfileListContent extends Component {
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
      articles,
      articlesLoading,
      biography,
      count,
      error,
      imageRatio,
      isLoading,
      jobTitle,
      name,
      onArticlePress,
      onNext,
      onPrev,
      onTwitterLinkPress,
      page,
      pageSize,
      twitter,
      uri,
      refetch,
      showImages
    } = this.props;

    const AuthorProfileHead = (
      <AuthorHead
        bio={biography}
        isLoading={isLoading}
        name={name}
        onTwitterLinkPress={onTwitterLinkPress}
        title={jobTitle}
        twitter={twitter}
        uri={uri}
      />
    );

    if (error) {
      return (
        <View style={styles.listErrorContainer}>
          {AuthorProfileHead}
          <AuthorProfileListError refetch={refetch} />
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
      <AuthorProfileListPagination
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
        renderItem={({ item, index }) => (
          <ErrorView>
            {({ hasError }) =>
              hasError ? null : (
                <AuthorProfileListItem
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
        ref={list => {
          this.listRef = list;
        }}
        scrollRenderAheadDistance={2}
        testID="scroll-view"
        viewabilityConfig={viewabilityConfig}
        ItemSeparatorComponent={() => (
          <View style={styles.listItemSeparatorContainer}>
            <AuthorProfileListItemSeparator />
          </View>
        )}
        ListFooterComponent={paginationComponent({
          hideResults: true,
          autoScroll: true
        })}
        ListHeaderComponent={
          <View>
            {AuthorProfileHead}
            {paginationComponent({ hideResults: false, autoScroll: false })}
          </View>
        }
      />
    );
  }
}

AuthorProfileListContent.propTypes = propTypes;
AuthorProfileListContent.defaultProps = defaultProps;

export default withTrackScrollDepth(AuthorProfileListContent);
