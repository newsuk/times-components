/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { View } from "react-native";
import Ad, { AdComposer } from "@times-components/ad";
import Button from "@times-components/button";
import ErrorView from "@times-components/error-view";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import { normaliseWidth } from "@times-components/utils";
import { scrollUpToPaging } from "./utils";
import ArticleListError from "./article-list-error";
import ArticleListItem from "./article-list-item";
import ArticleListItemSeparator from "./article-list-item-separator";
import ArticleListPagination from "./article-list-pagination";
import { propTypes, defaultProps } from "./article-list-prop-types";
import ArticleListEmptyState from "./article-list-empty-state";
import styles from "./styles";
import { ListContentContainer } from "./styles/responsive";

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.advertPosition = 4;
    this.pending = new Set();
    this.pendingTimer = null;
    this.state = {
      images: new Map()
    };

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const options = {
      rootMargin: spacing(10),
      threshold: 0.5
    };

    this.observer = new window.IntersectionObserver(
      this.handleObservation.bind(this),
      options
    );
  }

  shouldComponentUpdate(nextProps) {
    return this.props.page === nextProps.page;
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }

    clearTimeout(this.pendingTimer);
    this.pending.clear();
  }

  getImageSize(nodeId) {
    if (typeof window === "undefined") {
      return 100;
    }

    if (this.observer && nodeId) {
      return this.state.images.get(nodeId);
    }

    return normaliseWidth(window.clientWidth);
  }

  handleObservation(entries) {
    entries.forEach(({ target, intersectionRatio }) => {
      if (intersectionRatio >= 0.5 && !this.state.images.get(target.id)) {
        this.pending.add(target);
      } else if (intersectionRatio < 0.5 && this.pending.has(target)) {
        this.pending.delete(target);
      }
    });

    if (this.pending.size) {
      clearTimeout(this.pendingTimer);
      this.pendingTimer = setTimeout(() => {
        if (!this.pending.size) {
          return;
        }

        const curImages = new Map();

        this.pending.forEach(node =>
          curImages.set(node.id, normaliseWidth(node.clientWidth))
        );

        this.setState({
          images: new Map([...this.state.images, ...curImages])
        });
        this.pending.clear();
      }, 100);
    }
  }

  registerNode(node) {
    if (!node || !this.observer) {
      return;
    }

    this.observer.observe(node);
  }

  render() {
    const {
      adConfig,
      articleListHeader,
      articles,
      articlesLoading,
      count,
      emptyStateMessage,
      error,
      imageRatio,
      onArticlePress,
      onNext,
      onPrev,
      page,
      pageSize,
      receiveChildList,
      refetch,
      showImages
    } = this.props;

    const hasAdvertConfig = Object.keys(adConfig).length > 0;

    const paginationComponent = (
      { hideResults = false, autoScroll = false } = {}
    ) => (
      <ArticleListPagination
        count={count}
        hideResults={hideResults}
        onNext={(...args) => {
          onNext(...args);
          if (autoScroll) scrollUpToPaging(window);
        }}
        onPrev={(...args) => {
          onPrev(...args);
          if (autoScroll) scrollUpToPaging(window);
        }}
        page={page}
        pageSize={pageSize}
      />
    );

    const ErrorComponent = (
      <ListContentContainer>
        {paginationComponent()}
        <View style={styles.listContentErrorContainer}>
          <ArticleListError />
          <Button onPress={refetch} style={styles.retryButton} title="Retry" />
        </View>
      </ListContentContainer>
    );

    const AdComponent = (
      <View style={styles.adContainer}>
        <AdComposer adConfig={adConfig}>
          <Ad isLoading={articlesLoading} slotName="inline-ad" />
        </AdComposer>
      </View>
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

    const Contents =
      data.length === 0 ? (
        <ArticleListEmptyState message={emptyStateMessage} />
      ) : (
        <View>
          <ListContentContainer>
            {paginationComponent({ autoScroll: false, hideResults: false })}
          </ListContentContainer>
          {data &&
            data.map((article, index) => {
              const { id, elementId, url } = article;

              const renderAd = () => {
                if (index !== this.advertPosition || !hasAdvertConfig) {
                  return null;
                }

                return AdComponent;
              };

              const renderSeperator = () => {
                if (index === 0 || index === this.advertPosition + 1) {
                  return null;
                }

                return <ArticleListItemSeparator />;
              };

              return (
                <Fragment key={elementId}>
                  <div
                    accessibility-label={elementId}
                    data-testid={elementId}
                    id={elementId}
                    ref={node => this.registerNode(node)}
                  >
                    <ErrorView>
                      {({ hasError }) =>
                        hasError ? null : (
                          <ListContentContainer>
                            {renderSeperator()}
                            <ArticleListItem
                              {...article}
                              index={index}
                              length={data.length}
                              imageRatio={imageRatio}
                              imageSize={this.getImageSize(elementId) || 100}
                              onPress={e => onArticlePress(e, { id, url })}
                              showImage={showImages}
                            />
                          </ListContentContainer>
                        )
                      }
                    </ErrorView>
                  </div>
                  {renderAd()}
                </Fragment>
              );
            })}
          {paginationComponent({ autoScroll: true, hideResults: true })}
        </View>
      );

    if (!articlesLoading) receiveChildList(data);

    return (
      <View>
        {articleListHeader}
        {error ? ErrorComponent : Contents}
      </View>
    );
  }
}

ArticleList.propTypes = propTypes;
ArticleList.defaultProps = defaultProps;

export { default as ArticleListPageError } from "./article-list-page-error";
export { ArticleListEmptyState };
export default withTrackScrollDepth(ArticleList);
