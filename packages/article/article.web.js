import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import Ad, { AdComposer } from "@times-components/ad";

import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";
import { articlePropTypes, articleDefaultProps } from "./article-proptype";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleBody from "./article-body/article-body";
import LeadAssetComponent from "./article-lead-asset.web";
import articleTrackingContext from "./article-tracking-context";

import {
  MainContainer,
  HeaderContainer,
  MetaContainer,
  BodyContainer,
  HeaderAdContainer
} from "./styles/responsive";

const adStyle = {
  marginBottom: 0
};

class ArticlePage extends React.Component {
  static renderArticle(articleData) {
    const {
      headline,
      flags,
      standfirst,
      label,
      byline,
      publishedTime,
      publicationName,
      leadAsset,
      content
    } = articleData;

    return (
      <Fragment>
        <HeaderAdContainer key="headerAd">
          <Ad pos="header" style={adStyle} />
        </HeaderAdContainer>
        <MainContainer>
          <LeadAssetComponent device="MOBILE" leadAsset={leadAsset} />
          <HeaderContainer>
            <ArticleHeader
              headline={headline}
              flags={flags}
              standfirst={standfirst}
              label={label}
            />
          </HeaderContainer>
          <View>
            <MetaContainer>
              <ArticleMeta
                byline={byline}
                publishedTime={publishedTime}
                publicationName={publicationName}
              />
            </MetaContainer>
            <LeadAssetComponent device="DESKTOP" leadAsset={leadAsset} />
            <BodyContainer>
              <ArticleBody content={content} />
            </BodyContainer>
          </View>
        </MainContainer>
      </Fragment>
    );
  }

  render() {
    const { error, isLoading } = this.props;

    if (error) {
      return <ArticleError {...error} />;
    }

    if (isLoading) {
      return <ArticleLoading />;
    }

    return (
      <AdComposer adConfig={this.props.adConfig}>
        {ArticlePage.renderArticle(this.props.article)}
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
  adConfig: PropTypes.shape({}).isRequired
};

ArticlePage.defaultProps = {
  ...articleDefaultProps,
  isLoading: false,
  error: null
};

export default articleTrackingContext(ArticlePage);
