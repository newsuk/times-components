import React, { Component } from "react";
import ArticleSkeleton from "@times-components/article-skeleton";
import { getHeadline } from "@times-components/utils";
import {
  PuzzlesWebLightTheme,
  ArticleSidebar
} from "@times-components/ts-newskit";
import { NewsKitProvider } from "newskit";
import { CanShowPuzzleSidebar } from "@times-components/utils/src";
import ArticleHeader from "./article-header/article-header";
import {
  articlePropTypes,
  articleDefaultProps
} from "./article-prop-types/article-prop-types";
import { PuzzlesSidebar } from "./styles/responsive";

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
    const { article, showAudioPlayer } = this.props;
    const {
      bylines,
      expirableFlags,
      hasVideo,
      headline,
      label,
      publicationName,
      publishedTime,
      shortHeadline,
      standfirst,
      updatedTime,
      section
    } = article;

    const authorImage =
      bylines &&
      bylines.length > 0 &&
      bylines[0].image &&
      Object.keys(bylines[0].image).length !== 0 &&
      bylines[0].image.crop
        ? bylines[0].image.crop.url
        : null;

    return (
      <>
        <ArticleHeader
          authorImage={authorImage}
          bylines={bylines}
          flags={expirableFlags}
          hasVideo={hasVideo}
          headline={getHeadline(headline, shortHeadline)}
          label={label}
          publicationName={publicationName}
          publishedTime={publishedTime}
          standfirst={standfirst}
          updatedTime={updatedTime}
          showAudioPlayer={showAudioPlayer}
        />
        {CanShowPuzzleSidebar(section) && (
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
        )}
      </>
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
      showAudioPlayer,
      swgProductId,
      zephrDivs,
      storefrontConfig
    } = this.props;

    if (error || isLoading) {
      return null;
    }

    return (
      <ArticleSkeleton
        analyticsStream={analyticsStream}
        data={article}
        Header={this.renderHeader}
        logoUrl={logoUrl}
        receiveChildList={receiveChildList}
        navigationMode={navigationMode}
        commentingConfig={commentingConfig}
        paidContentClassName={paidContentClassName}
        isPreview={isPreview}
        swgProductId={swgProductId}
        zephrDivs={zephrDivs}
        showAudioPlayer={showAudioPlayer}
        storefrontConfig={storefrontConfig}
      />
    );
  }
}

ArticlePage.propTypes = articlePropTypes;
ArticlePage.defaultProps = articleDefaultProps;

export default ArticlePage;
