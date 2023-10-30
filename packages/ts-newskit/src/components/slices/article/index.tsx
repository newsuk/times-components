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
  FullWidthCardMediaMob
} from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
import { ClickHandlerType, MouseEventType } from '../../../slices/types';
import { articleClickTracking } from '../../../utils/tracking';
import {
  ArticleTileInfo,
  expirableFlagsProps
} from '../shared/articleTileInfo';
import { getActiveArticleFlags } from '../../../utils/getActiveArticleFlag';

type ImageCrops = {
  url?: string;
  ratio?: string;
};

type ImageProps = {
  alt?: string;
  caption?: string;
  crops?: ImageCrops[];
};

export interface ArticleProps {
  id: string;
  headline: string;
  url: string;
  images?: ImageProps;
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
    imageRight,
    isFullWidth,
    titleTypographyPreset = 'editorialHeadline020',
    tagAndFlagMarginBlockStart = { xs: 'space050', md: 'space040' },
    expirableFlags,
    label,
    contentType,
    hasVideo
  } = article;
  const imageWithCorrectRatio =
    images && images.crops && images.crops.find(crop => crop.ratio === '3:2');

  const hasArticleTileInfo =
    (expirableFlags &&
      getActiveArticleFlags(expirableFlags) &&
      expirableFlags.length > 0) ||
    label ||
    contentType;

  const marginBlockStart = imageRight || hideImage ? 'space000' : 'space040';
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
          <GridLayoutItem area="media">
            <FullWidthCardMediaMob
              href={url}
              external={false}
              onClick={onClick}
              className="article-image"
            >
              <Image
                src={`${imageWithCorrectRatio!.url}&resize=750`}
                alt={(images && images.alt) || headline}
                loadingAspectRatio={imageWithCorrectRatio!.ratio || '3:2'}
                loading="lazy"
              />
            </FullWidthCardMediaMob>
          </GridLayoutItem>
        ) : (
          <GridLayoutItem area="media">
            <CardHeadlineLink
              href={url}
              external={false}
              onClick={onClick}
              className="article-image"
            >
              <Image
                src={`${imageWithCorrectRatio!.url}&resize=750`}
                alt={(images && images.alt) || headline}
                loadingAspectRatio={imageWithCorrectRatio!.ratio || '3:2'}
                loading="lazy"
              />
            </CardHeadlineLink>
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
              stylePreset="inkSubtle"
              typographyPreset="editorialCaption010"
            >
              {images.caption}
            </TextBlock>
          )}

        <ArticleTileInfo
          hasVideo={hasVideo}
          contentType={contentType}
          expirableFlags={expirableFlags}
          label={label}
          marginBlockStart={marginBlockStart}
        />
        <CardHeadlineLink
          href={url}
          role="link"
          overrides={{
            typographyPreset: titleTypographyPreset,
            marginBlockStart: hasArticleTileInfo ? 'space030' : marginBlockStart
          }}
          external={false}
          onClick={onClick}
        >
          {headline}
        </CardHeadlineLink>
        <TagAndFlag
          tag={tag}
          flag={flag}
          marginBlockStart={tagAndFlagMarginBlockStart}
        />
      </CardContent>
    </CardComposable>
  );
};
