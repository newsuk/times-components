import React from "react";
import { Platform, View } from "react-native";
import PropTypes from "prop-types";
import get from "lodash.get";
import { renderTrees } from "@times-components/markup";
import ArticleImage from "@times-components/article-image";
import { AdComposer } from "@times-components/ad";
import { withTrackingContext } from "@times-components/tracking";

import ArticleError from "./article-error";
import ArticleLoading from "./article-loading";

import {
  PrimaryContainer,
  SecondaryContainer,
  InlineContainer,
  LeadAsset,
  MainContainer,
  MetaContainer,
  HeaderContainer,
  ParagraphContainer,
  Paragraph,
  LeadAssetMobile,
  LeadAssetDesktop,
  MediaContainerMobile,
  MediaContainerDesktop
} from "./styles/body/responsive";
import ArticleHeader from "./article-header";
import ArticleMeta from "./article-meta";

const withAdComposer = (children, section = "article") => (
  <AdComposer section={section}>{children}</AdComposer>
);

class ArticlePage extends React.Component {
  static renderArticle(articleData) {
    const { leadAsset } = articleData;
    const LeadAssetMedia = articleData.leadAsset ? (
      <LeadAsset>
        <LeadAssetMobile>
          <ArticleImage
            imageOptions={{
              ratio: leadAsset.crop.ratio,
              url: leadAsset.crop.url
            }}
          />
        </LeadAssetMobile>
        <LeadAssetDesktop>
          <ArticleImage
            imageOptions={{
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
    ) : null;
    const contentArray = articleData.content.map((i, index) => ({
      data: i,
      index
    }));
    const BodyView = contentArray.map(i => ArticlePage.renderBody(i));
    return (
      <MainContainer>
        <MediaContainerMobile>{LeadAssetMedia}</MediaContainerMobile>
        <HeaderContainer>
          <ArticleHeader
            headline={articleData.headline}
            flags={articleData.flags}
            standfirst={articleData.standfirst}
            label={articleData.label}
          />
        </HeaderContainer>
        <View>
          <MetaContainer>
            <ArticleMeta
              byline={articleData.byline}
              publishedTime={articleData.publishedTime}
              publicationName={articleData.publicationName}
            />
          </MetaContainer>
          <MediaContainerDesktop>{LeadAssetMedia}</MediaContainerDesktop>
          {BodyView}
        </View>
      </MainContainer>
    );
  }

  static renderBody(content) {
    return (
      <View>
        {renderTrees([content.data], {
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
            const ImageContainer = ArticlePage.imageContainerChooser(
              attributes.display
            );
            return (
              <ImageContainer key={key}>
                <ArticleImage
                  key={key}
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
          }
        })}
      </View>
    );
  }

  static imageContainerChooser(imageType) {
    switch (imageType) {
      case "primary":
        return PrimaryContainer;
      case "secondary":
        return SecondaryContainer;
      case "inline":
        return InlineContainer;
      default:
        return null;
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

    return Platform.OS === "web"
      ? withAdComposer(ArticleListView)
      : ArticleListView;
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
