import React from "react";
import {
  ArticleFlags,
  UpdatedTimeProvider
} from "@times-components/ts-components";
import { InArticleAudio, TCThemeProvider } from "@times-components/ts-newskit";
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
    <TCThemeProvider>
      <InArticleAudio
        showAudioPlayer={showAudioPlayer}
        src="https://ncu-newskit-docs.s3.eu-west-1.amazonaws.com/storybook-assets/audio_file_1.mp3"
        readyToPlayText="Listen to article"
        playingText="Playing"
        narrator="James Marriott"
        headline="Sorry, we can’t all be destined for greatness"
        feedback={{
          requestFeedback: true,
          feedbackMessage:
            "Want to listen to more articles? Give your feedback below or email",
          thankyouMessage:
            "Thank you for your feedback. We're always trying to give you the best possible experience – your feedback helps us do this."
        }}
      />
    </TCThemeProvider>
  </HeaderContainer>
);

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;
