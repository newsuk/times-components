import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import get from "lodash.get";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import { AdComposer } from "@times-components/ad";
import { withTrackingContext } from "@times-components/tracking";
import PullQuote from "@times-components/pull-quote";

import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";

import {
  MainContainer,
  HeaderContainer,
  MetaContainer
} from "./styles/responsive";

import {
  ParagraphContainer,
  Paragraph,
  LeadAsset,
  LeadAssetMobile,
  LeadAssetDesktop,
  MediaContainerMobile,
  MediaContainerDesktop,
  PrimaryImg,
  SecondaryImg,
  InlineImg,
  PullQuoteContainer,
  PullQuoteResp
} from "./styles/body/responsive";
import ArticleHeader from "./article-header";
import ArticleMeta from "./article-meta";

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
      leadAsset
    } = articleData;
    const LeadAssetMedia = ArticlePage.renderLeadAsset(leadAsset);
    const contentArray = articleData.content.map((data, index) => ({
      data,
      index
    }));
    const BodyView = contentArray.map((content, index) =>
      ArticlePage.renderBody(content, index)
    );
    return (
      <MainContainer>
        <MediaContainerMobile>{LeadAssetMedia}</MediaContainerMobile>
        <HeaderContainer>
          <ArticleHeader
            headline={headline}
            flags={flags}
            standfirst={standfirst}
            label={label}
          />
        </HeaderContainer>
        <View style={{display: 'block'}}>
          <MetaContainer>
            <ArticleMeta
              byline={byline}
              publishedTime={publishedTime}
              publicationName={publicationName}
            />
          </MetaContainer>
          <MediaContainerDesktop>{LeadAssetMedia}</MediaContainerDesktop>
          {BodyView}
        </View>
      </MainContainer>
    );
  }

  static renderLeadAsset(leadAsset) {
    return (
      <LeadAsset>
        <LeadAssetMobile>
          <ArticleImage
            imageOptions={{
              display: "",
              ratio: leadAsset.crop.ratio,
              url: leadAsset.crop.url
            }}
          />
        </LeadAssetMobile>
        <LeadAssetDesktop>
          <ArticleImage
            imageOptions={{
              display: "",
              ratio: leadAsset.crop.ratio,
              url: leadAsset.crop.url
            }}
            captionOptions={{
              caption: leadAsset.caption,
              credits: leadAsset.credits
            }}
          />
        </LeadAssetDesktop>
      </LeadAsset>
    );
  }

  static renderBody(content, index) {
    return (
      // <View key={`content${index}`}>
        renderTrees([content.data], {
          paragraph(key, attributes, children) {
            return (
              <ParagraphContainer
                testID={`paragraph-${content.index}`}
                accessibilityLabel={`paragraph-${content.index}`}
                key={key}
              >
                <Paragraph>{children}</Paragraph>
              </ParagraphContainer>
            );
          },
          image(key, attributes) {
            const ImageContainer = ArticlePage.getImageContainer(
              attributes.display
            );
            return (
              <ImageContainer key={key}>
                <ArticleImage
                  imageOptions={{
                    display: attributes.display,
                    ratio: attributes.ratio,
                    url: attributes.url
                  }}
                  captionOptions={{
                    caption: attributes.caption,
                    credits: attributes.credits
                  }}
                />
              </ImageContainer>
            );
          },
          pullquote(key, attributes) {
            return (
              <PullQuoteContainer
              testID={`pullquote-${content.index}`}
              accessibilityLabel={`pullquote-${content.index}`}
              key={key}
              >
              <PullQuoteResp>
                <PullQuote key={key} content={attributes.content} caption={attributes.caption.name} />
              </PullQuoteResp>
                {/* <PullQuoteResp /> */}
                <p>A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. </p>

                {/* <ParagraphContainer>
                <Paragraph>A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. A load of teext that should be the next paragraph as it comes through. </Paragraph>
                </ParagraphContainer> */}

              </PullQuoteContainer>
            );
          }
        })
      // {/* </View> */}
    );
  }

  static getImageContainer(imageType) {
    switch (imageType) {
      case "secondary":
        return SecondaryImg;
      case "inline":
        return InlineImg;
      default:
        return PrimaryImg;
    }
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

export default withTrackingContext(ArticlePage, {
  trackingObject: "Article",
  getAttrs: ({ article } = {}) => ({
    byline: get(article, "byline[0].children[0].attributes.value", ""),
    headline: get(article, "headline", ""),
    publishedTime: get(article, "publishedTime", "")
  })
});
