import React from "react";
import {
  ArticleFlags,
  UpdatedTimeProvider
} from "@times-components/ts-components";
import { InArticleAudio } from "@times-components/ts-newskit";
import Image from "@times-components/image";
import { checkStylesForUnits } from "@times-components/utils";

import Label from "../article-label/article-label";
import Meta from "../article-meta/article-meta";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

import {
  AuthorImageContainer,
  FlagsContainer,
  HeaderContainer,
  HeadlineContainer
} from "../styles/responsive";

const ArticleHeader = ({
  authorImage,
  bylines,
  flags,
  hasVideo,
  headline,
  label,
  publicationName,
  showAudioPlayer,
  publishedTime,
  standfirst,
  updatedTime
}) => (
  <HeaderContainer style={{ ...styles.header, ...styles.container }}>
    <AuthorImageContainer style={styles.authorImage}>
      <Image
        aspectRatio={1}
        uri={authorImage}
        accessibilityLabel="author-image"
      />
    </AuthorImageContainer>
    <Label isVideo={hasVideo} label={label} />
    <HeadlineContainer
      role="heading"
      aria-level="1"
      styles={checkStylesForUnits(styles.articleHeadline)}
    >
      {headline}
    </HeadlineContainer>
    <FlagsContainer>
      <UpdatedTimeProvider updatedTime={updatedTime}>
        <ArticleFlags flags={flags} />
      </UpdatedTimeProvider>
    </FlagsContainer>
    <Standfirst standfirst={standfirst} />
    <Meta
      bylines={bylines}
      publicationName={publicationName}
      publishedTime={publishedTime}
    />
    <InArticleAudio
      showAudioPlayer={showAudioPlayer}
      src=""
      readyToPlayText="Listen to article"
      playingText="Playing"
      narrator={
        bylines ? bylines[0]?.byline[0]?.children[0]?.attributes?.value : ""
      }
      headline={headline}
      feedback={{
        requestFeedback: true,
        feedbackMessage:
          "Want to listen to more articles? Give your feedback below or email",
        thankyouMessage:
          "Thank you for your feedback. We're always trying to give you the best possible experience – your feedback helps us do this."
      }}
    />
  </HeaderContainer>
);

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
