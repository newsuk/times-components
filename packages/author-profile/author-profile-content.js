import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { withTrackScrollDepth } from "@times-components/tracking";
import ErrorView from "@times-components/error-view";
import AuthorProfileAuthorHead from "./author-profile-author-head";
import AuthorProfilePagination from "./author-profile-pagination";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import { propTypes, defaultProps } from "./author-profile-content-prop-types";
import AuthorProfileListingError from "./author-profile-listing-error";
import { normaliseWidth } from "./utils";

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 10,
    paddingRight: 10
  },
  errorContainer: {
    flex: 1,
    margin: 15
  }
});

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: false
};

class AuthorProfileContent extends React.Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get("window");

    this.state = {
      width: normaliseWidth(width)
    };
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
      count,
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
      uri,
      imageRatio,
      showImages,
      error,
      refetch
    } = this.props;

    const AuthorHead = (
      <AuthorProfileAuthorHead
        isLoading={isLoading}
        name={name}
        bio={biography}
        uri={uri}
        title={jobTitle}
        twitter={twitter}
        onTwitterLinkPress={onTwitterLinkPress}
      />
    );

    if (error) {
      return (
        <View style={styles.errorContainer}>
          {AuthorHead}
          <AuthorProfileListingError refetch={refetch} />
        </View>
      );
    }

    const scrollToTopNextFrame = () => {
      this.scrollAnimationFrame = global.requestAnimationFrame(() => {
        this.listRef.scrollToOffset({
          offset: 0,
          animated: true
        });
      });
    };

    const paginationComponent = (hideResults = false) => (
      <AuthorProfilePagination
        count={count}
        hideResults={hideResults}
        onNext={(...args) => {
          onNext(...args);
          scrollToTopNextFrame();
        }}
        onPrev={(...args) => {
          onPrev(...args);
          scrollToTopNextFrame();
        }}
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
      : articles.map((article, idx) => ({
          ...article,
          elementId: `articleList-${page}-${idx}`
        }));

    if (!articlesLoading) this.props.receiveChildList(data);

    return (
      <FlatList
        ref={list => {
          this.listRef = list;
        }}
        testID="scroll-view"
        accessibilityID="scroll-view"
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <ErrorView>
            {({ hasError }) =>
              hasError ? null : (
                <AuthorProfileItem
                  {...item}
                  imageRatio={imageRatio}
                  imageSize={this.state.width}
                  showImage={showImages}
                  style={styles.padding}
                  testID={`articleList-${index}`}
                  onPress={e =>
                    onArticlePress(e, { id: item.id, url: item.url })
                  }
                />
              )
            }
          </ErrorView>
        )}
        initialListSize={pageSize}
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
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
    );
  }
}

AuthorProfileContent.propTypes = propTypes;
AuthorProfileContent.defaultProps = defaultProps;

export default withTrackScrollDepth(AuthorProfileContent);
