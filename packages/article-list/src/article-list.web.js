/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { View } from "react-native";
import Ad, { AdComposer } from "@times-components/ad";
import Button from "@times-components/button";
import ErrorView from "@times-components/error-view";
import { spacing } from "@times-components/styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import { normaliseWidth } from "@times-components/utils";
import LazyLoad from "@times-components/lazy-load";
import { scrollUpToPaging } from "./utils";
import ArticleListError from "./article-list-error";
import ArticleListItem from "./article-list-item";
import ArticleListItemSeparator from "./article-list-item-separator";
import ArticleListPagination from "./article-list-pagination";
import { propTypes, defaultProps } from "./article-list-prop-types";
import ArticleListEmptyState from "./article-list-empty-state";
import styles, { retryButtonStyles } from "./styles";
import { ListContentContainer } from "./styles/responsive";

class ArticleList extends Component {
  static getImageSize(node) {
    if (typeof window === "undefined") {
      return null;
    }

    return node ? normaliseWidth(node.clientWidth) : null;
  }

  constructor(props) {
    super(props);

    this.advertPosition = 4;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.page === nextProps.page;
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
          if (autoScroll && typeof window !== "undefined")
            scrollUpToPaging(window);
        }}
        onPrev={(...args) => {
          onPrev(...args);
          if (autoScroll && typeof window !== "undefined")
            scrollUpToPaging(window);
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
          <Button onPress={refetch} style={retryButtonStyles} title="Retry" />
        </View>
      </ListContentContainer>
    );

    const renderAdComponent = ({ key }) => (
      <AdComposer adConfig={adConfig} key={key}>
        <Ad
          isLoading={articlesLoading}
          slotName="inline-ad"
          style={styles.adContainer}
        />
      </AdComposer>
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

    const Contents = ({ clientHasRendered, observed, registerNode }) =>
      data.length === 0 ? (
        <ArticleListEmptyState message={emptyStateMessage} />
      ) : (
        <View>
          <ListContentContainer>
            {paginationComponent({ autoScroll: false, hideResults: false })}
          </ListContentContainer>
          {data &&
            data.map((article, index) => {
              const { elementId } = article;

              const renderAd = () => {
                if (index === this.advertPosition && hasAdvertConfig) {
                  return renderAdComponent({ key: `advert${index}` });
                }

                return null;
              };

              const renderSeperator = () => {
                if (index === 0) {
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
                    ref={node => registerNode(node)}
                  >
                    <ErrorView>
                      {({ hasError }) =>
                        hasError ? null : (
                          <ListContentContainer>
                            {renderSeperator()}
                            <ArticleListItem
                              {...article}
                              fadeImageIn={clientHasRendered}
                              highResSize={ArticleList.getImageSize(
                                observed.get(elementId)
                              )}
                              imageRatio={imageRatio}
                              index={index}
                              length={data.length}
                              lowResSize={100}
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
      <LazyLoad rootMargin={spacing(10)} threshold={0.5}>
        {({ clientHasRendered, observed, registerNode }) => (
          <View>
            {articleListHeader}
            {error
              ? ErrorComponent
              : Contents({
                  clientHasRendered,
                  observed,
                  registerNode
                })}
          </View>
        )}
      </LazyLoad>
    );
  }
}

ArticleList.propTypes = propTypes;
ArticleList.defaultProps = defaultProps;

export { default as ArticleListPageError } from "./article-list-page-error";
export { ArticleListEmptyState };
export default withTrackScrollDepth(ArticleList);
