import React, { Component, Fragment } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline, getLeadAsset } from "@times-components/utils";
import {
  PuzzlesWebLightTheme,
  ArticleSidebar
} from "@times-components/ts-newskit";
import { NewsKitProvider } from "newskit";
import Caption from "@times-components/caption";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";
import ArticleTopics from "./article-topics";
import {
  articleDefaultProps,
  articlePropTypes
} from "./article-prop-types/article-prop-types";
import { LeadAssetCaptionContainer } from "./styles/article-body/responsive";

import {
  PuzzlesSidebar,
  ArticleMainStandardContainer,
  HeaderContainer,
  HeaderTopContainer,
  LeadAsset,
  MetaContainer
} from "./styles/responsive";

const renderCaption = ({ caption }) => (
  <LeadAssetCaptionContainer>
    <Caption {...caption} />
  </LeadAssetCaptionContainer>
);

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
    this.state = {
      initialPosition: 0
    };
    this.sidebarRef = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    const sidebarNode = this.sidebarRef.current;
    if (sidebarNode) {
      const rect = sidebarNode.getBoundingClientRect();
      this.setState({ initialPosition: rect.top });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const sidebarNode = this.sidebarRef.current;

    if (sidebarNode) {
      const rect = sidebarNode.getBoundingClientRect();
      const adElement = document.querySelector(
        ".responsive__InlineAdWrapper-sc-4v1r4q-17"
      );
      const relatedArticlesElement = document.getElementById(
        "related-articles"
      );

      let isAdIntersecting = false;
      let isRelatedArticlesIntersecting = false;

      if (adElement) {
        const adRect = adElement.getBoundingClientRect();
        isAdIntersecting =
          adRect.top <= rect.bottom && adRect.bottom >= rect.top;
      }

      if (relatedArticlesElement) {
        const relatedArticlesRect = relatedArticlesElement.getBoundingClientRect();
        isRelatedArticlesIntersecting =
          relatedArticlesRect.top <= window.innerHeight &&
          relatedArticlesRect.bottom >= 0;
      }

      const { initialPosition } = this.state;
      if (isAdIntersecting || isRelatedArticlesIntersecting) {
        sidebarNode.style.transition = "opacity 0.5s ease";
        sidebarNode.style.opacity = "0";
      } else {
        const isScrolled = rect.top <= 0 && window.scrollY > initialPosition;
        sidebarNode.style.transition = "opacity 0.5s ease";
        sidebarNode.style.opacity = "1";
        sidebarNode.style.position = isScrolled ? "fixed" : "absolute";
        sidebarNode.style.top = isScrolled ? "0" : "100%";
      }
    }
  }

  renderHeader() {
    const { article } = this.props;
    const {
      bylines,
      hasVideo,
      headline,
      expirableFlags,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      topics,
      updatedTime
    } = article;

    const metaProps = { bylines, publicationName, publishedTime };

    return (
      <Fragment>
        <HeaderTopContainer>
          <HeaderContainer>
            <ArticleHeader
              flags={expirableFlags}
              hasVideo={hasVideo}
              headline={getHeadline(headline, shortHeadline)}
              label={label}
              standfirst={standfirst}
              updatedTime={updatedTime}
            />
          </HeaderContainer>
          <MetaContainer>
            <ArticleMeta {...metaProps} />
            <ArticleTopics topics={topics} />
          </MetaContainer>

          <NewsKitProvider theme={PuzzlesWebLightTheme}>
            <PuzzlesSidebar ref={this.sidebarRef}>
              <ArticleSidebar
                pageLink="https://www.thetimes.co.uk/puzzles"
                sectionTitle="Puzzles"
                data={[
                  {
                    title: "Crossword",
                    url: "https://www.thetimes.co.uk/puzzles/crossword",
                    imgUrl:
                      "https://www.thetimes.co.uk/imageserver/image/%2Fpuzzles%2Ficons%2F33b27655-dcc9-421f-906f-b2b10dd26865.png?crop=1250%2C833%2C0%2C0&resize=500"
                  },
                  {
                    title: "Polygon",
                    url: "https://www.thetimes.co.uk/puzzles/word-puzzles",
                    imgUrl:
                      "https://www.thetimes.co.uk/imageserver/image/%2Fpuzzles%2Ficons%2F33b27655-dcc9-421f-906f-b2b10dd26865.png?crop=1250%2C833%2C0%2C0&resize=500"
                  },
                  {
                    title: "Sudoku",
                    url: "https://www.thetimes.co.uk/puzzles/sudoku",
                    imgUrl:
                      "https://www.thetimes.co.uk/imageserver/image/%2Fpuzzles%2Ficons%2F33b27655-dcc9-421f-906f-b2b10dd26865.png?crop=1250%2C833%2C0%2C0&resize=500"
                  }
                ]}
              />
            </PuzzlesSidebar>
          </NewsKitProvider>
        </HeaderTopContainer>
        <LeadAsset {...getLeadAsset(article)} renderCaption={renderCaption} />
        <ArticleMeta {...metaProps} inline className="inline-meta" />
      </Fragment>
    );
  }

  render() {
    const {
      article,
      analyticsStream,
      error,
      isLoading,
      logoUrl,
      navigationMode,
      receiveChildList,
      commentingConfig,
      paidContentClassName,
      isPreview,
      swgProductId,
      getFallbackThumbnailUrl169,
      zephrDivs,
      storefrontConfig
    } = this.props;

    if (error || isLoading) {
      return null;
    }

    return (
      <ArticleMainStandardContainer>
        <ArticleSkeleton
          analyticsStream={analyticsStream}
          data={article}
          Header={this.renderHeader}
          logoUrl={logoUrl}
          getFallbackThumbnailUrl169={getFallbackThumbnailUrl169}
          receiveChildList={receiveChildList}
          navigationMode={navigationMode}
          commentingConfig={commentingConfig}
          paidContentClassName={paidContentClassName}
          isPreview={isPreview}
          swgProductId={swgProductId}
          zephrDivs={zephrDivs}
          storefrontConfig={storefrontConfig}
        />
      </ArticleMainStandardContainer>
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
