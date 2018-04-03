import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Ad, { AdComposer } from "@times-components/ad";

import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";
import { articlePropTypes, articleDefaultProps } from "./article-proptype";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleBody from "./article-body/article-body";
import LeadAssetComponent from "./article-lead-asset";
import articleTrackingContext from "./article-tracking-context";
import getLeadAsset from "./get-lead-asset";
import Topics from "./topics";
import RelatedArticles from "./related-articles/related-articles";

import {
  MainContainer,
  HeaderContainer,
  MetaContainer,
  LeadAssetContainer,
  BodyContainer,
  HeaderAdContainer
} from "./styles/responsive";

const adStyle = {
  marginBottom: 0
};

class ArticlePage extends React.Component {
  static renderArticle(articleData, onRelatedArticlePress, onAuthorPress) {
    const {
      headline,
      flags,
      standfirst,
      label,
      byline,
      publishedTime,
      publicationName,
      content,
      section,
      url,
      topics,
      relatedArticles,
      relatedArticlesLayout
    } = articleData;
    const leadAssetProps = getLeadAsset(articleData);
    const displayRelatedArticles =
      relatedArticlesLayout && relatedArticlesLayout.template ? (
        <RelatedArticles
          analyticsStream={() => {}}
          articles={relatedArticles}
          template={relatedArticlesLayout.template}
          onPress={onRelatedArticlePress}
          mainId={relatedArticlesLayout.main}
        />
      ) : null;

    return (
      <Fragment>
        <HeaderAdContainer key="headerAd">
          <Ad pos="header" style={adStyle} section={section} contextUrl={url} />
        </HeaderAdContainer>
        <MainContainer>
          <HeaderContainer>
            <ArticleHeader
              headline={headline}
              flags={flags}
              standfirst={standfirst}
              label={label}
              isVideo={leadAssetProps.isVideo}
            />
          </HeaderContainer>
          <MetaContainer>
            <ArticleMeta
              byline={byline}
              publishedTime={publishedTime}
              publicationName={publicationName}
              onAuthorPress={onAuthorPress}
            />
            <Topics topics={topics} device="DESKTOP" />
          </MetaContainer>
          <LeadAssetContainer>
            <LeadAssetComponent {...leadAssetProps} />
          </LeadAssetContainer>
          <BodyContainer>
            <ArticleBody content={content} section={section} contextUrl={url} />
          </BodyContainer>
        </MainContainer>
        <Topics topics={topics} />
        {displayRelatedArticles}
        <Ad pos="pixel" section={section} contextUrl={url} />
        <Ad pos="pixelteads" section={section} contextUrl={url} />
        <Ad pos="pixelskin" section={section} contextUrl={url} />
      </Fragment>
    );
  }

  render() {
    const {
      error,
      isLoading,
      onRelatedArticlePress,
      onAuthorPress
    } = this.props;

    if (error) {
      return <ArticleError {...error} />;
    }

    if (isLoading) {
      return <ArticleLoading />;
    }

    return (
      <AdComposer adConfig={this.props.adConfig}>
        {ArticlePage.renderArticle(
          this.props.article,
          onRelatedArticlePress,
          onAuthorPress
        )}
      </AdComposer>
    );
  }
}

ArticlePage.propTypes = {
  ...articlePropTypes,
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    networkError: PropTypes.shape({
      message: PropTypes.string
    }),
    message: PropTypes.string
  }),
  adConfig: PropTypes.shape({}).isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired
};

ArticlePage.defaultProps = {
  ...articleDefaultProps,
  isLoading: false,
  error: null
};

export { articlePropTypes, articleDefaultProps };
export default articleTrackingContext(ArticlePage);
