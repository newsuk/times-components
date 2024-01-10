import {
  TextBlock,
  Block,
  CardContent,
  CardComposable,
  Divider,
  Image,
  MQ
} from 'newskit';
import React from 'react';
import {
  CardHeadlineLink,
  StyledSpan,
  FullWidthGridLayoutItem
} from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
import { UnorderedListItems } from './unorderedList';
import {
  ClickHandlerType,
  MouseEventType,
  ImageProps,
  ListData,
  expirableFlagsProps
} from '../../../slices/types';
import { articleClickTracking } from '../../../utils/tracking';
import { ArticleTileInfo } from '../shared/articleTileInfo';

export interface LeadArticleProps {
  id: string;
  headline: string;
  flag?: string;
  shortSummary?: string;
  contentType?: string;
  hasVideo: boolean;
  label?: string;
  datePublished?: string;
  expirableFlags?: expirableFlagsProps[];
  images?: ImageProps;
  url: string;
  tag?: {
    label: string;
    href: string;
  };
  isListView?: boolean;
  imageTop?: boolean;
  isLeadImage?: boolean;
  byline?: string;
  hasTopBorder?: boolean;
  contentTop?: boolean;
  contentWidth?: MQ<string> | string;
  columnGap?: MQ<string> | string;
  headlineTypographyPreset?: MQ<string> | string;
  loadingAspectRatio?: string;
  textBlockMarginBlockStart?: MQ<string> | string;
  tagAndFlagMarginBlockStart?: MQ<string> | string;
  listData?: ListData[];
  hideImage?: boolean;
}

export const LeadArticle = ({
  article,
  clickHandler,
  className
}: {
  article: LeadArticleProps;
  clickHandler: ClickHandlerType;
  className?: string;
}) => {
  const {
    id,
    headline,
    flag,
    shortSummary,
    contentType,
    hasVideo,
    images,
    url,
    tag,
    byline,
    imageTop,
    hasTopBorder = true,
    contentTop,
    isListView,
    contentWidth,
    isLeadImage,
    columnGap,
    headlineTypographyPreset,
    loadingAspectRatio,
    textBlockMarginBlockStart = 'space040',
    tagAndFlagMarginBlockStart = { xs: 'space050', md: 'space040' },
    listData,
    hideImage,
    expirableFlags,
    label
  } = article;
  const imageWithCorrectRatio =
    images && images.crops
      ? images.crops.find(crop => crop.ratio === loadingAspectRatio) ||
        images.crops.find(crop => crop.ratio === '3:2') ||
        images.crops.find(crop => crop.ratio === '*')
      : undefined;

  const hasImage =
    images &&
    images.crops &&
    images.crops.length > 0 &&
    imageWithCorrectRatio &&
    imageWithCorrectRatio.url !== '';

  const hasCaption = !!(images && images.caption);

  const hasCredits = !!(images && images.credits);

  const hasCaptionOrCredits = hasCaption || hasCredits;

  const headlineTypography = headlineTypographyPreset
    ? headlineTypographyPreset
    : imageTop
      ? { xs: 'editorialHeadline040', md: 'editorialHeadline030' }
      : 'editorialHeadline040';
  const displayArticleVertical = imageTop || hideImage;

  const onClick = (event: MouseEventType) => {
    const articleForTracking = { headline, id, url };
    articleClickTracking(event, articleForTracking, clickHandler);
  };

  const forceExternalContentRatio = (image: { url: string; ratio: string }) => {
    if (image.ratio === '*') {
      return '3:2';
    }
    return image.ratio;
  };

  return (
    <CardComposable
      areas={{
        xs: displayArticleVertical
          ? `media
             content`
          : `content 
             media`,
        md: displayArticleVertical
          ? `media 
             content`
          : `content media`
      }}
      columnGap={columnGap || 'space040'}
      columns={displayArticleVertical || !contentWidth ? '100%' : contentWidth}
      className={className}
    >
      {hasImage &&
        !hideImage && (
          <Block
            marginBlockEnd={imageTop ? 'space040' : 'space000'}
            className="lead-image-container"
          >
            <FullWidthGridLayoutItem
              area="media"
              ratio={
                imageWithCorrectRatio!.ratio !== '*'
                  ? imageWithCorrectRatio!.ratio
                  : forceExternalContentRatio(imageWithCorrectRatio as any)
              }
              className="lead-article-image"
              marginBlockEnd={hasCaptionOrCredits ? 'space020' : 'space000'}
            >
              <a href={url} onClick={onClick} className="article-image">
                <Image
                  src={
                    imageWithCorrectRatio &&
                    `${imageWithCorrectRatio.url}&resize=750`
                  }
                  alt={(images && images.alt) || headline}
                  loadingAspectRatio={
                    imageWithCorrectRatio &&
                    imageWithCorrectRatio.ratio &&
                    forceExternalContentRatio(imageWithCorrectRatio as any)
                  }
                />
              </a>
            </FullWidthGridLayoutItem>
            {hasCaptionOrCredits &&
              isLeadImage && (
                <TextBlock
                  typographyPreset="editorialCaption010"
                  stylePreset="inkSubtle"
                >
                  {images && images.caption}
                  {images &&
                    images.credits && (
                      <StyledSpan hasCaption={hasCaption}>
                        {images.credits}
                      </StyledSpan>
                    )}
                </TextBlock>
              )}
          </Block>
        )}

      <CardContent
        alignContent="start"
        overrides={{
          marginBlockEnd: contentTop ? 'space040' : 'space000'
        }}
      >
        {hasTopBorder && (
          <Divider
            overrides={{
              stylePreset: 'dashedDivider',
              marginBlockEnd: 'space045'
            }}
          />
        )}
        <ArticleTileInfo
          hasVideo={hasVideo}
          contentType={contentType}
          expirableFlags={expirableFlags}
          label={label}
          marginBlockEnd="space020"
        />
        <CardHeadlineLink
          href={url}
          overrides={{
            typographyPreset: headlineTypography
          }}
          external={false}
          onClick={onClick}
        >
          {headline}
        </CardHeadlineLink>
        {shortSummary && (
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
          byline={byline}
          isListView={isListView}
          marginBlockStart={tagAndFlagMarginBlockStart}
        />
        <UnorderedListItems listData={listData} clickHandler={clickHandler} />
      </CardContent>
    </CardComposable>
  );
};
