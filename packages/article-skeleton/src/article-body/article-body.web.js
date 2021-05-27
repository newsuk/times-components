import React from "react";
import PropTypes from "prop-types";

import { AdContainer } from "@times-components/ad";
import LazyLoad from "@times-components/lazy-load";
import ArticleImage from "@times-components/article-image";

import ArticleParagraph, {
  DropCapView
} from "@times-components/article-paragraph";

import Context from "@times-components/context";
import InteractiveWrapper from "@times-components/interactive-wrapper";
import KeyFacts from "@times-components/key-facts";
import coreRenderers from "@times-components/markup";
import PullQuote from "@times-components/pull-quote";
import { colours, spacing } from "@times-components/styleguide";
import Video from "@times-components/video";
import renderTrees from "@times-components/markup-forest";
import { AspectRatioContainer } from "@times-components/utils";
import {
  FetchProvider,
  InArticlePuff,
  InlineNewsletterPuff,
  PreviewNewsletterPuff,
  AutoNewsletterPuff
} from "@times-components/ts-components";

import ArticleLink from "./article-link";
import InsetCaption from "./inset-caption";

import {
  PrimaryImg,
  SecondaryImg,
  InlineImg,
  FullWidthImg,
  InteractiveContainer,
  PullQuoteContainer,
  PullQuoteResp,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  NativeAd,
  NativeAdTitle,
  Ad,
  InlineAdWrapper
} from "../styles/article-body/responsive";

const deckApiUrl = "https://gobble.timesdev.tools/deck/api/deck-post-action/";

export const responsiveDisplayWrapper = displayType => {
  switch (displayType) {
    case "secondary":
      return SecondaryImg;
    case "inline":
      return InlineImg;
    case "fullwidth":
      return FullWidthImg;
    default:
      return PrimaryImg;
  }
};

const highResSizeCalc = (observed, key, template) => {
  const screenWidth =
    observed.get(key) && observed.get(key).clientWidth
      ? observed.get(key).clientWidth
      : null;

  const indepthRetinaScreenWidth =
    screenWidth &&
    window.devicePixelRatio > 1 &&
    template === "indepth" &&
    screenWidth * 1.5;

  return indepthRetinaScreenWidth || screenWidth;
};

const renderers = ({
  paidContentClassName,
  template,
  analyticsStream,
  isPreview,
  inArticlePuffFlag
}) => ({
  ...coreRenderers,
  ad(key) {
    return (
      <InlineAdWrapper>
        <AdContainer key={key} slotName="inline-ad" />
      </InlineAdWrapper>
    );
  },
  dropCap(key, attrs, children) {
    return (
      <Context.Consumer key={key}>
        {({
          theme: { dropCapFont, sectionColour = colours.section.default }
        }) => (
          <DropCapView colour={sectionColour} font={dropCapFont}>
            {children}
          </DropCapView>
        )}
      </Context.Consumer>
    );
  },
  nativeAd(key) {
    return (
      <NativeAd className="group-3 hidden" key={key}>
        <NativeAdTitle>Sponsored</NativeAdTitle>
        <Ad id="advert-inarticle-native-1" data-parent="group-3" />
        <Ad id="advert-inarticle-native-2" data-parent="group-3" />
      </NativeAd>
    );
  },
  image(key, { display, ratio, url, caption, credits }) {
    const MediaWrapper = responsiveDisplayWrapper(display);
    return (
      <LazyLoad key={key} rootMargin={spacing(40)} threshold={0}>
        {({ observed, registerNode }) => (
          <div id={key} ref={node => registerNode(node)}>
            <MediaWrapper>
              <ArticleImage
                captionOptions={{
                  caption,
                  credits
                }}
                imageOptions={{
                  display,
                  highResSize: highResSizeCalc(observed, key, template),
                  lowResQuality: 3,
                  lowResSize: 400,
                  ratio,
                  uri: url
                }}
              />
            </MediaWrapper>
          </div>
        )}
      </LazyLoad>
    );
  },
  interactive(key, { url, element, display }) {
    const { attributes, value } = element;

    switch (value) {
      case "newsletter-puff":
        // eslint-disable-next-line no-case-declarations
        const { code, copy, headline, imageUri, label } = attributes;

        return isPreview ? (
          <PreviewNewsletterPuff
            copy={decodeURIComponent(copy)}
            headline={decodeURIComponent(headline)}
            imageUri={decodeURIComponent(imageUri)}
            label={decodeURIComponent(label)}
          />
        ) : (
          <InlineNewsletterPuff
            analyticsStream={analyticsStream}
            key={key}
            code={code}
            copy={decodeURIComponent(copy)}
            headline={decodeURIComponent(headline)}
            imageUri={decodeURIComponent(imageUri)}
            label={decodeURIComponent(label)}
          />
        );

      case "in-article-puff":
        if (inArticlePuffFlag) {
          return (
            <Context.Consumer key={key}>
              {({ theme }) => (
                <FetchProvider url={deckApiUrl + attributes["deck-id"]}>
                  <InArticlePuff
                    sectionColour={theme.sectionColour}
                    forceImageAspectRatio="3:2"
                    sanitiseHtml
                  />
                </FetchProvider>
              )}
            </Context.Consumer>
          );
        }

      default:
        return (
          <InteractiveContainer key={key} fullWidth={display === "fullwidth"}>
            <InteractiveWrapper
              attributes={attributes}
              element={value}
              key={key}
              source={url}
            />
          </InteractiveContainer>
        );
    }
  },
  autoNewsletterPuff(key, { element }) {
    const {
      attributes: { code, copy, headline, imageUri, label }
    } = element;

    return (
      <AutoNewsletterPuff
        analyticsStream={analyticsStream}
        key={key}
        code={code}
        copy={copy}
        headline={headline}
        imageUri={imageUri}
        label={label}
      />
    );
  },
  keyFacts(key, attributes, renderedChildren, indx, node) {
    return <KeyFacts ast={node} key={key} />;
  },
  heading2(key, attributes, children) {
    return <Heading2>{children}</Heading2>;
  },
  heading3(key, attributes, children) {
    return <Heading3>{children}</Heading3>;
  },
  heading4(key, attributes, children) {
    return <Heading4>{children}</Heading4>;
  },
  heading5(key, attributes, children) {
    return <Heading5>{children}</Heading5>;
  },
  heading6(key, attributes, children) {
    return <Heading6>{children}</Heading6>;
  },
  link(key, attributes, children) {
    const { href, target, dropCap } = attributes;

    return (
      <ArticleLink dropCap={dropCap} key={key} target={target} url={href}>
        {children}
      </ArticleLink>
    );
  },
  paragraph(key, attributes, children) {
    const id = attributes && attributes.id;
    return (
      <ArticleParagraph key={key} {...(id ? { id } : {})}>
        {children}
      </ArticleParagraph>
    );
  },
  paywall(key, attributes, children) {
    return (
      <span className={paidContentClassName} key={key}>
        {children}
      </span>
    );
  },
  pullQuote(
    key,
    {
      caption: { name, text, twitter }
    },
    children
  ) {
    return (
      <Context.Consumer key={key}>
        {({
          theme: { pullQuoteFont, sectionColour = colours.section.default }
        }) => (
          <PullQuoteContainer>
            <PullQuoteResp>
              <PullQuote
                caption={name}
                font={pullQuoteFont}
                quoteColour={sectionColour}
                text={text}
                twitter={twitter}
              >
                {children}
              </PullQuote>
            </PullQuoteResp>
          </PullQuoteContainer>
        )}
      </Context.Consumer>
    );
  },
  video(
    key,
    {
      id,
      is360,
      brightcovePolicyKey,
      brightcoveVideoId,
      brightcoveAccountId,
      brightcovePlayerId,
      caption,
      posterImageUrl
    }
  ) {
    const MediaWrapper = responsiveDisplayWrapper("primary");
    return (
      <MediaWrapper key={key}>
        <figure style={{ margin: 0 }}>
          <AspectRatioContainer aspectRatio="16:9">
            <Video
              id={id}
              is360={is360}
              accountId={brightcoveAccountId}
              height="100%"
              playerId={brightcovePlayerId}
              policyKey={brightcovePolicyKey}
              poster={{ uri: posterImageUrl }}
              videoId={brightcoveVideoId}
              width="100%"
            />
          </AspectRatioContainer>
          <figcaption>
            <InsetCaption caption={caption} />
          </figcaption>
        </figure>
      </MediaWrapper>
    );
  }
});

const decorateAd = ({ contextUrl, section }) => element =>
  element.name === "ad"
    ? { ...element, attributes: { ...element.attributes, contextUrl, section } }
    : element;

const ArticleBody = ({
  content: bodyContent,
  contextUrl,
  section,
  paidContentClassName,
  template,
  isPreview,
  inArticlePuffFlag
}) =>
  renderTrees(
    bodyContent.map(decorateAd({ contextUrl, section })),
    renderers({ paidContentClassName, template, isPreview, inArticlePuffFlag })
  );

ArticleBody.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.object,
      children: PropTypes.arrayOf(PropTypes.object),
      name: PropTypes.string
    })
  ).isRequired,
  contextUrl: PropTypes.string.isRequired,
  paidContentClassName: PropTypes.string,
  section: PropTypes.string
};

export { ArticleLink };
export default ArticleBody;
