/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { View } from "react-native";
import AuthorHead from "@times-components/author-head";
import ErrorView from "@times-components/error-view";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import { normaliseWidth } from "@times-components/utils";
import ArticleListError from "./article-list-error";
import ArticleListItem from "./article-list-item";
import ArticleListItemSeparator from "./article-list-item-separator";
import ArticleListPagination from "./article-list-pagination";
import { propTypes, defaultProps } from "./article-list-prop-types";
import styles from "./styles";
import { ListContentContainer } from "./styles/responsive";

const scrollUpToPaging = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.scroll({
    top: 0,
    left: 0
  });
};

class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.pending = new Set();
    this.pendingTimer = null;
    this.images = new Map();
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

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }

    clearTimeout(this.pendingTimer);
    this.pending.clear();
    this.images.clear();
  }

  getImageSize(nodeId) {
    if (this.observer) {
      return this.state.images.get(nodeId);
    }

    return this.images.get(nodeId);
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
    if (!node) {
      return;
    }

    if (this.observer) {
      this.observer.observe(node);
    } else {
      this.images.set(node.id, normaliseWidth(node.clientWidth));
    }
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
      receiveChildList,
      refetch,
      showImages,
      twitter,
      uri
    } = this.props;

    const paginationComponent = (
      { hideResults = false, autoScroll = false } = {}
    ) => (
      <ArticleListPagination
        count={count}
        hideResults={hideResults}
        onNext={(...args) => {
          onNext(...args);
          if (autoScroll) scrollUpToPaging();
        }}
        onPrev={(...args) => {
          onPrev(...args);
          if (autoScroll) scrollUpToPaging();
        }}
        page={page}
        pageSize={pageSize}
      />
    );

    const ErrorComponent = (
      <ListContentContainer>
        {paginationComponent()}
        <View
          style={[
            styles.listContentContainer,
            styles.listContentErrorContainer
          ]}
        >
          <ArticleListError refetch={refetch} />
        </View>
      </ListContentContainer>
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

    const Contents = (
      <ListContentContainer>
        {paginationComponent({ autoScroll: false, hideResults: false })}
        <View style={styles.listContentContainer}>
          {data &&
            data.map((article, index) => {
              const { id, elementId, url } = article;
              const separatorComponent =
                index > 0 ? <ArticleListItemSeparator /> : null;

              return (
                <div
                  accessibility-label={elementId}
                  data-testid={elementId}
                  id={elementId}
                  key={elementId}
                  ref={node => this.registerNode(node)}
                >
                  <ErrorView>
                    {({ hasError }) =>
                      hasError ? null : (
                        <Fragment>
                          {separatorComponent}
                          <ArticleListItem
                            {...article}
                            imageRatio={imageRatio}
                            imageSize={this.getImageSize(elementId) || 100}
                            onPress={e => onArticlePress(e, { id, url })}
                            showImage={showImages}
                          />
                        </Fragment>
                      )
                    }
                  </ErrorView>
                </div>
              );
            })}
        </View>
        {paginationComponent({ autoScroll: true, hideResults: true })}
      </ListContentContainer>
    );

    if (!articlesLoading) receiveChildList(data);

    return (
      <View>
        <AuthorHead
          bio={biography}
          isLoading={isLoading}
          name={name}
          onTwitterLinkPress={onTwitterLinkPress}
          title={jobTitle}
          twitter={twitter}
          uri={uri}
        />
        {error ? ErrorComponent : Contents}
      </View>
    );
  }
}

ArticleList.propTypes = propTypes;
ArticleList.defaultProps = defaultProps;

export default withTrackScrollDepth(ArticleList);
export { default as ArticleListPageError } from "./article-list-page-error";
