/* eslint-env browser */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { withTrackScrollDepth } from "@times-components/tracking";
import AuthorProfileAuthorHead from "./author-profile-author-head";
import AuthorProfileItem from "./author-profile-item";
import AuthorProfileItemSeparator from "./author-profile-item-separator";
import AuthorProfilePagination from "./author-profile-pagination";
import { propTypes, defaultProps } from "./author-profile-content-prop-types";
import { normaliseWidth } from "./utils";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10
  },
  contentContainer: {
    maxWidth: 680,
    alignSelf: "center",
    width: "100%"
  }
});

class AuthorProfileContent extends Component {
  constructor(props) {
    super(props);

    this.images = new Map();
    this.state = {
      images: new Map()
    };

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const options = {
      rootMargin: "50px",
      threshold: 1.0
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
  }

  getImageSize(nodeId) {
    if (this.observer) {
      return this.state.images.get(nodeId);
    }

    return this.images.get(nodeId);
  }

  handleObservation(entries) {
    const curImages = new Map();

    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting && !this.state.images.get(target.id)) {
        curImages.set(target.id, normaliseWidth(target.clientWidth));
      }
    });

    if (curImages.size) {
      this.setState({
        images: new Map([...this.state.images, ...curImages])
      });
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
        <View style={styles.contentContainer}>
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
        </View>
      </View>
    );
  }
}

AuthorProfileContent.propTypes = propTypes;
AuthorProfileContent.defaultProps = defaultProps;

export default withTrackScrollDepth(AuthorProfileContent);
