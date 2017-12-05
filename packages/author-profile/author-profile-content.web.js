/* eslint-env browser */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { withTrackScrollDepth } from "@times-components/tracking";
import AuthorProfileAuthorHead from "./author-profile-author-head";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import AuthorProfilePagination from "./author-profile-pagination";
import { propTypes, defaultProps } from "./author-profile-content-prop-types";
import { normaliseWidth } from "./utils";

const styles = StyleSheet.create({
  container: {
    width: "100%"
  }
});

const ContentContainer = withResponsiveStyles(View, {
  base: () => `
    align-self: center;
    width: 100%;
    max-width: 680px;
  `,
  hugeUp: () => "max-width: 760px;"
});

class AuthorProfileContent extends Component {
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
      rootMargin: "50px",
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
      receiveChildList
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

    const data = (articlesLoading
      ? Array(pageSize)
          .fill()
          .map((number, id) => ({ id, isLoading: true }))
      : articles
    ).map((article, idx) => ({
      ...article,
      elementId: `articleList-${page}-${idx}`
    }));

    if (!articlesLoading) receiveChildList(data);

    return (
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
        <ContentContainer>
          {paginationComponent()}
          <View style={styles.container}>
            {data &&
              data.map((article, key) => {
                const { id, url } = article;
                const separatorComponent =
                  key > 0 ? <AuthorProfileItemSeparator /> : null;

                return (
                  <div
                    key={id}
                    id={article.elementId}
                    accessibility-label={article.elementId}
                    data-testid={article.elementId}
                    ref={node => this.registerNode(node)}
                  >
                    {separatorComponent}
                    <AuthorProfileItem
                      {...article}
                      imageRatio={imageRatio}
                      imageSize={this.getImageSize(article.elementId)}
                      onPress={e => onArticlePress(e, { id, url })}
                    />
                  </div>
                );
              })}
          </View>
          {paginationComponent(true)}
        </ContentContainer>
      </View>
    );
  }
}

AuthorProfileContent.propTypes = propTypes;
AuthorProfileContent.defaultProps = defaultProps;

export default withTrackScrollDepth(AuthorProfileContent);
