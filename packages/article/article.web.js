import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { AdComposer } from "@times-components/ad";

import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleBody from "./article-body/article-body";
import LeadAssetComponent from "./article-lead-asset.web";

import articleTrackingContext from "./article-tracking-context";

import {
  MainContainer,
  HeaderContainer,
  MetaContainer,
  BodyContainer
} from "./styles/responsive";

const withAdComposer = (children, section = "article") => (
  <AdComposer section={section}>{children}</AdComposer>
);

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

    const ArticleListView = ArticlePage.renderArticle(this.props.article);
    return withAdComposer(ArticleListView);
  }
}

ArticlePage.propTypes = {
  article: PropTypes.shape({
    ...ArticleHeader.propTypes,
    ...ArticleMeta.propTypes
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    networkError: PropTypes.shape({
      message: PropTypes.string
    }),
    message: PropTypes.string
  })
};

ArticlePage.defaultProps = {
  article: null,
  isLoading: false,
  error: null
};

export default articleTrackingContext(ArticlePage);
