import {
  TextBlock,
  Block,
  CardContent,
  CardComposable,
  Divider,
  Hidden
} from 'newskit';
import React from 'react';
import {
  CardHeadlineLink,
  FullWidthCardMediaMob,
  TextLink
} from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
import { UnorderedListItems } from './unorderedList';

type ImageCrops = {
  url?: string;
  ratio?: string;
};
type ListData = {
  label: string;
  href: string;
};

type ImageProps = {
  alt?: string;
  credit?: string;
  crops?: ImageCrops[];
};
export interface LeadArticleProps {
  headline: string;
  flag?: string;
  summary?: string;
  tagL1?: {
    label: string;
    href: string;
  };
  images?: ImageProps;
  url: string;
  tag?: {
    label: string;
    href: string;
  };
  imageTop?: boolean;
  hasTopBorder?: boolean;
  contentTop?: boolean;
  contentWidth?: string;
  headlineTypographyPreset?: string;
  loadingAspectRatio?: string;
  imageMarginBlockStart?: string;
  textBlockMarginBlockStart?: string;
  tagAndFlagMarginBlockStart?: string;
  listData?: ListData[];
  showTagL1?: boolean;
  hideImage?: boolean;
}
export const LeadArticle = ({
  headline,
  flag,
  summary,
  tagL1,
  images,
  url,
  tag,
  imageTop,
  hasTopBorder = true,
  contentTop,
  contentWidth,
  headlineTypographyPreset,
  loadingAspectRatio,
  imageMarginBlockStart = 'space000',
  textBlockMarginBlockStart = 'space040',
  tagAndFlagMarginBlockStart = 'space040',
  listData,
  showTagL1,
  hideImage
}: LeadArticleProps) => {
  const imageWithCorrectRatio =
    images && images.crops
      ? images.crops.find(crop => crop.ratio === loadingAspectRatio) ||
        images.crops.find(crop => crop.ratio === '3:2')
      : null;

  const cardImage = images &&
    imageWithCorrectRatio &&
    imageWithCorrectRatio.url !== '' && {
      media: {
        src: imageWithCorrectRatio.url,
        alt: (images && images.alt) || headline,
        loadingAspectRatio: imageWithCorrectRatio.ratio
      }
    };

  const hasImage =
    images &&
    images.crops &&
    images.crops.length > 0 &&
    imageWithCorrectRatio &&
    imageWithCorrectRatio.url !== '';

  const hasCaption = images && images.credit;
  const headlineTypography = headlineTypographyPreset
    ? headlineTypographyPreset
    : imageTop
      ? { xs: 'editorialHeadline040', md: 'editorialHeadline030' }
      : 'editorialHeadline040';
  const displayArticleVertical = imageTop || hideImage;

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
      columnGap="space040"
      columns={{
        md: displayArticleVertical ? '100%' : `${contentWidth || '260px'} auto`
      }}
    >
      {hasImage &&
        !hideImage && (
          <Block
            marginBlockEnd={imageTop ? 'space050' : 'space000'}
            marginBlockStart={imageMarginBlockStart}
          >
            <FullWidthCardMediaMob {...cardImage} />
            {hasCaption && (
              <TextBlock
                marginBlockStart="space020"
                typographyPreset="utilityMeta010"
              >
                {images && images.credit}
              </TextBlock>
            )}
          </Block>
        )}

      <CardContent
        alignContent="start"
        overrides={{ marginBlockEnd: contentTop ? 'space040' : 'space000' }}
      >
        {hasTopBorder && (
          <Divider
            overrides={{
              stylePreset: 'dashedDivider',
              marginBlockEnd: 'space050'
            }}
          />
        )}

        {tagL1 &&
          tagL1.label !== '' && (
            <Hidden xs={showTagL1} sm={showTagL1}>
              <TextLink
                overrides={{
                  typographyPreset: 'utilityButton010',
                  stylePreset: 'inkBrand010',
                  marginBlockEnd: 'space040'
                }}
                href={tagL1.href}
              >
                {tagL1.label}
              </TextLink>
            </Hidden>
          )}

        <CardHeadlineLink
          href={url}
          overrides={{
            typographyPreset: headlineTypography
          }}
          external={false}
          expand={!tag}
        >
          {headline}
        </CardHeadlineLink>
        {summary && (
          <TextBlock
            typographyPreset={{
              xs: 'editorialParagraph020',
              md: 'editorialParagraph010'
            }}
            marginBlockStart={textBlockMarginBlockStart}
            as="p"
          >
            {summary}
          </TextBlock>
        )}
        <TagAndFlag
          tag={tag}
          flag={flag}
          marginBlockStart={tagAndFlagMarginBlockStart}
        />
        <UnorderedListItems listData={listData} />
      </CardContent>
    </CardComposable>
  );
};
