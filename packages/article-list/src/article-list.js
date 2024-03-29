/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { AdContainer } from "@times-components/ad";
import Button from "@times-components/button";
import ErrorView from "@times-components/error-view";
import { spacing } from "@times-components/ts-styleguide";
import { withTrackScrollDepth } from "@times-components/tracking";
import {
  TcView,
  normaliseWidthForAssetRequestCache
} from "@times-components/utils";
import LazyLoad from "@times-components/lazy-load";
import { scrollUpToPaging } from "./utils/index";
import ArticleListError from "./article-list-error";
import ArticleListItem from "./article-list-item";
import ArticleListItemSeparator from "./article-list-item-separator";
import ArticleListPagination from "./article-list-pagination";
import { propTypes, defaultProps } from "./article-list-prop-types";
import ArticleListEmptyState from "./article-list-empty-state";
import styles, { retryButtonStyles } from "./styles/index";
import { ListContentContainer, InlineAdWrapper } from "./styles/responsive";

class ArticleList extends Component {
  static getImageSize(node) {
    if (typeof window === "undefined") {
      return null;
    }

    return node ? normaliseWidthForAssetRequestCache(node.clientWidth) : null;
  }

  constructor(props) {
    super(props);

    this.advertPosition = 4;
  }

  shouldComponentUpdate(nextProps) {
    const { page } = this.props;
    return page === nextProps.page;
  }

  render() {
    const {
      articleListHeader,
      articles,
      articlesLoading,
      count = 0,
      emptyStateMessage,
      error,
      imageRatio,
      onNext,
      onPrev,
      scrollToTop = true,
      page = 0,
      pageSize,
      receiveChildList,
      refetch,
      showImages
    } = this.props;

    const paginationComponent = ({
      hideResults = false,
      autoScroll = false
    } = {}) => (
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
        <TcView style={styles.listContentErrorContainer}>
          <ArticleListError />
          <Button onPress={refetch} style={retryButtonStyles} title="Retry" />
        </TcView>
      </ListContentContainer>
    );

    const renderAdComponent = () => (
      <InlineAdWrapper>
        <AdContainer isLoading={articlesLoading} slotName="articleListAd" />
      </InlineAdWrapper>
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
        <TcView>
          <ListContentContainer>
            {paginationComponent({ autoScroll: false, hideResults: false })}
          </ListContentContainer>
          {data &&
            data.map((item, index) => {
              const { elementId } = item;

              const renderAd = () => {
                if (index === this.advertPosition) {
                  return renderAdComponent({ key: `advert${index}` });
                }

                return null;
              };

              const renderSeparator = () => {
                if (index === 0) {
                  return null;
                }

                return <ArticleListItemSeparator />;
              };

              const highResSize = ArticleList.getImageSize(
                observed.get(elementId)
              );

              return (
                <Fragment key={elementId}>
                  <div
                    accessibility-label={elementId}
                    data-testid={`article-list-item-${index}`}
                    id={elementId}
                    ref={node => registerNode(node)}
                  >
                    <ErrorView>
                      {({ hasError }) =>
                        hasError ? null : (
                          <ListContentContainer>
                            {renderSeparator()}
                            <ArticleListItem
                              article={item.isLoading ? null : item}
                              fadeImageIn={clientHasRendered}
                              highResSize={highResSize}
                              imageRatio={imageRatio}
                              index={index}
                              isLoading={
                                item.isLoading === true || !highResSize
                              }
                              length={data.length}
                              lowResQuality={3}
                              lowResSize={200}
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
          {paginationComponent({ autoScroll: scrollToTop, hideResults: true })}
        </TcView>
      );

    if (!articlesLoading) receiveChildList(data);

    return (
      <LazyLoad rootMargin={spacing(40)} threshold={0}>
        {({ clientHasRendered, observed, registerNode }) => (
          <TcView role="main">
            {articleListHeader}
            {error
              ? ErrorComponent
              : Contents({
                  clientHasRendered,
                  observed,
                  registerNode
                })}
          </TcView>
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
