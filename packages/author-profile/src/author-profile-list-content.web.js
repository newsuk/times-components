/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { View } from "react-native";
import AuthorHead from "@times-components/author-head";
import ErrorView from "@times-components/error-view";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import { normaliseWidth } from "@times-components/utils";
import AuthorProfileListPagination from "./author-profile-list-pagination";
import AuthorProfileListItem from "./author-profile-list-item";
import AuthorProfileListItemSeparator from "./author-profile-list-item-separator";
import AuthorProfileListError from "./author-profile-list-error";
import {
  propTypes,
  defaultProps
} from "./author-profile-list-content-prop-types";
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

class AuthorProfileListContent extends Component {
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
      jobTitle,
      isLoading,
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
      receiveChildList,
      error,
      refetch
    } = this.props;

    const paginationComponent = (
      { hideResults = false, autoScroll = false } = {}
    ) => (
      <AuthorProfileListPagination
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
          <AuthorProfileListError refetch={refetch} />
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
                index > 0 ? <AuthorProfileListItemSeparator /> : null;

              return (
                <div
                  key={elementId}
                  id={elementId}
                  accessibility-label={elementId}
                  data-testid={elementId}
                  ref={node => this.registerNode(node)}
                >
                  <ErrorView>
                    {({ hasError }) =>
                      hasError ? null : (
                        <Fragment>
                          {separatorComponent}
                          <AuthorProfileListItem
                            {...article}
                            imageRatio={imageRatio}
                            imageSize={this.getImageSize(elementId) || 100}
                            showImage={showImages}
                            onPress={e => onArticlePress(e, { id, url })}
                          />
                        </Fragment>
                      )
                    }
                  </ErrorView>
                </div>
              );
            })}
        </View>
        {paginationComponent({ hideResults: true, autoScroll: true })}
      </ListContentContainer>
    );

    if (!articlesLoading) receiveChildList(data);

    return (
      <View>
        <AuthorHead
          isLoading={isLoading}
          name={name}
          bio={biography}
          uri={uri}
          title={jobTitle}
          twitter={twitter}
          onTwitterLinkPress={onTwitterLinkPress}
        />
        {error ? ErrorComponent : Contents}
      </View>
    );
  }
}

AuthorProfileListContent.propTypes = propTypes;
AuthorProfileListContent.defaultProps = defaultProps;

export default withTrackScrollDepth(AuthorProfileListContent);
