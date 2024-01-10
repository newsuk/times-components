import React from 'react';
import {
  Divider,
  CardContent,
  TextBlock,
  CardComposable,
  GridLayoutItem,
  MQ,
  Image
} from 'newskit';
import {
  CardHeadlineLink,
  FullWidthBlock,
  FullWidthGridLayoutItem
} from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
import {
  ClickHandlerType,
  MouseEventType,
  ImageProps,
  expirableFlagsProps
} from '../../../slices/types';
import { articleClickTracking } from '../../../utils/tracking';
import { ArticleTileInfo } from '../shared/articleTileInfo';
import { getActiveArticleFlags } from '../../../utils/getActiveArticleFlag';

export interface ArticleProps {
  id: string;
  headline: string;
  url: string;
  images?: ImageProps;
  shortSummary?: string;
  isSummaryEnabled?: boolean;
  tag?: {
    label: string;
    href: string;
  };
  contentType?: string;
  hasVideo: boolean;
  label?: string;
  expirableFlags?: expirableFlagsProps[];
  flag?: string;
  hasTopBorder?: boolean;
  topBorderStyle?: MQ<string> | string;
  hideImage?: boolean;
  isLeadImage?: boolean;
  imageRight?: boolean;
  isFullWidth?: boolean;
  textBlockMarginBlockStart?: MQ<string> | string;
  titleTypographyPreset?: MQ<string> | string;
  tagAndFlagMarginBlockStart?: MQ<string> | string;
}

export const Article = ({
  article,
  clickHandler,
  className
}: {
  article: ArticleProps;
  clickHandler: ClickHandlerType;
  className?: string;
}) => {
  const {
    id,
    images,
    headline,
    url,
    tag,
    flag,
    hasTopBorder,
    topBorderStyle = 'dashedDivider',
    hideImage,
    isLeadImage,
    shortSummary,
    isSummaryEnabled,
    imageRight,
    isFullWidth,
    textBlockMarginBlockStart = 'space040',
    titleTypographyPreset = 'editorialHeadline020',
    tagAndFlagMarginBlockStart = { xs: 'space050', md: 'space040' },
    expirableFlags,
    label,
    contentType,
    hasVideo
  } = article;

  const imageWithCorrectRatio =
    images && images.crops && images.crops.find(crop => crop.ratio === '3:2' || '*');

  const hasCaption = !!(images && images.caption);
  const hasCredits = !!(images && images.credits);

  const hasCaptionOrCredits = hasCaption || hasCredits;

  const hasArticleTileInfo =
    (expirableFlags &&
      getActiveArticleFlags(expirableFlags) &&
      expirableFlags.length > 0) ||
    label ||
    contentType ||
    hasVideo;

  const hasImage =
    images &&
    images.crops &&
    images.crops.length > 0 &&
    imageWithCorrectRatio &&
    imageWithCorrectRatio.url !== '';

  const showImage = hasImage && !hideImage;

  const onClick = (event: MouseEventType) => {
    const articleForTracking = { headline, id, url };
    articleClickTracking(event, articleForTracking, clickHandler);
  };

  const articleDivider = (
    <Divider
      overrides={{
        marginBlockEnd: 'space040',
        stylePreset: topBorderStyle
      }}
      aria-label="article-divider-horizontal"
    />
  );

  const image = (
    <a href={url} onClick={onClick}>
      <Image
        src={imageWithCorrectRatio && `${imageWithCorrectRatio.url}&resize=750`}
        alt={(images && images.alt) || headline}
        loadingAspectRatio={
          imageWithCorrectRatio ? imageWithCorrectRatio.ratio : '3:2'
        }
        loading="lazy"
      />
    </a>
  );

  return (
    <CardComposable
      alignContent="start"
      areas={
        imageRight
          ? `
        border  border
        content media`
          : `border
         media
         content
      `
      }
      columns={{ xl: imageRight ? '1fr 1fr' : '1fr' }}
      columnGap="space040"
      className={className}
    >
      {hasTopBorder && (
        <GridLayoutItem area="border">
          {isFullWidth ? (
            <FullWidthBlock
              paddingInline={{
                xs: 'space045',
                md: 'space000'
              }}
            >
              {articleDivider}
            </FullWidthBlock>
          ) : (
            articleDivider
          )}
        </GridLayoutItem>
      )}
      {showImage ? (
        isLeadImage ? (
          <FullWidthGridLayoutItem
            area="media"
            aria-label="article-lead-image"
            className="article-image"
            marginBlockEnd={hasCaptionOrCredits ? 'space000' : 'space020'}
          >
            {image}
          </FullWidthGridLayoutItem>
        ) : (
          <GridLayoutItem
            area="media"
            className="article-image"
            marginBlockEnd={{
              xs: 'space040',
              lg: 'space030',
              xl: imageRight ? 'space000' : 'space030'
            }}
          >
            {image}
          </GridLayoutItem>
        )
      ) : null}
      <CardContent alignContent="start">
        {images &&
          !imageRight &&
          images.caption &&
          !hideImage && (
            <TextBlock
              marginBlockStart="space020"
              marginBlockEnd="space040"
              stylePreset="inkSubtle"
              typographyPreset="editorialCaption010"
            >
              {images.caption}
            </TextBlock>
          )}

        {hasArticleTileInfo && (
          <ArticleTileInfo
            hasVideo={hasVideo}
            contentType={contentType}
            expirableFlags={expirableFlags}
            label={label}
            marginBlockEnd="space020"
          />
        )}
        <CardHeadlineLink
          className="article-headline"
          href={url}
          role="link"
          overrides={{
            typographyPreset: titleTypographyPreset
          }}
          external={false}
          onClick={onClick}
        >
          {headline}
        </CardHeadlineLink>
        {isSummaryEnabled &&
          shortSummary && (
            <CardHeadlineLink href={url} external={false} onClick={onClick}>
              <TextBlock
                stylePreset={{
                  xs: 'inkSubtle',
                  md: 'inkBase'
                }}
                typographyPreset={{
                  xs: 'editorialParagraph020',
                  md: 'editorialParagraph010'
                }}
                marginBlockStart={textBlockMarginBlockStart}
                as="p"
              >
                {shortSummary}
              </TextBlock>
            </CardHeadlineLink>
          )}
        <TagAndFlag
          tag={tag}
          flag={flag}
          marginBlockStart={tagAndFlagMarginBlockStart}
        />
      </CardContent>
    </CardComposable>
  );
};
