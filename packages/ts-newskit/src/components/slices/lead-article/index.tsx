import {
  TextBlock,
  Block,
  CardContent,
  CardComposable,
  Tag,
  Divider,
  Hidden
} from 'newskit';
import React from 'react';
import {
  CardHeadlineLink,
  FullWidthCardMediaMob,
  StyledUnorderedList
} from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';

export interface LeadArticleProps {
  headline: string;
  flag?: string;
  summary?: string;
  tagL1?: string;
  caption?: string;
  image?: string;
  url: string;
  tag?: {
    label: string;
    href: string;
  };
  imageTop?: boolean;
  hasTopBorder?: boolean;
  contentTop?: boolean;
  typographyPreset?: string;
  loadingAspectRatio?: string;
  marginBlockStart?: string;
  textBlockMarginBlockStart?: string;
  tagAndFlagBlockMarginBlockStart?: string;
  listData?: string[];
  showTagL1?: boolean;
}
export const LeadArticle = ({
  headline,
  flag,
  summary,
  tagL1,
  caption,
  image,
  url,
  tag,
  imageTop,
  hasTopBorder = true,
  contentTop,
  typographyPreset,
  loadingAspectRatio,
  marginBlockStart,
  textBlockMarginBlockStart,
  tagAndFlagBlockMarginBlockStart,
  listData,
  showTagL1
}: LeadArticleProps) => {
  const stylePresets = {
    typographyPreset: 'utilityButton010',
    stylePreset: 'inkBrand010',
    marginBlockEnd: 'space040',
    paddingInline: 'space000'
  };

  return (
    <CardComposable
      areas={{
        xs: imageTop
          ? `media
             content`
          : `content 
             media`,
        md: imageTop
          ? `media 
             content`
          : `content media`
      }}
      columnGap="space040"
      columns={{ md: imageTop ? '1fr' : '3fr 5fr' }}
    >
      {image && (
        <Block
          marginBlockEnd={imageTop ? 'space050' : 'space000'}
          marginBlockStart={marginBlockStart || 'space000'}
        >
          <FullWidthCardMediaMob
            media={{
              src: image,
              alt: headline,
              loadingAspectRatio: loadingAspectRatio || '3:2'
            }}
          />
          <TextBlock
            marginBlockStart="space020"
            typographyPreset="utilityMeta010"
          >
            {caption}
          </TextBlock>
        </Block>
      )}

      <CardContent
        alignContent="start"
        overrides={{ marginBlockEnd: contentTop ? 'space040' : 'space000' }}
      >
        {hasTopBorder && (
          <>
            {!imageTop && (
              <Divider
                overrides={{
                  stylePreset: 'dashedDivider',
                  marginBlockEnd: 'space050'
                }}
              />
            )}
          </>
        )}

        {tagL1 && (
          <Hidden xs={showTagL1} sm={showTagL1}>
            <Tag
              size="small"
              overrides={{
                ...stylePresets
              }}
            >
              {tagL1}
            </Tag>
          </Hidden>
        )}
        <CardHeadlineLink
          href={url}
          overrides={{
            typographyPreset: typographyPreset
              ? typographyPreset
              : imageTop
                ? { xs: 'editorialHeadline040', md: 'editorialHeadline030' }
                : 'editorialHeadline040'
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
            marginBlockStart={textBlockMarginBlockStart || 'space040'}
            as="p"
          >
            {summary}
          </TextBlock>
        )}

        {(tag || flag) && (
          <TagAndFlag
            tag={tag}
            flag={flag}
            marginBlockStart={tagAndFlagBlockMarginBlockStart || 'space040'}
          />
        )}
        {listData && (
          <StyledUnorderedList
            overrides={{
              marker: {
                size: 'iconSize005',
                spaceInline: 'space020',
                stylePreset: 'inkContrast'
              },
              marginBlockStart: 'space050',
              content: {
                typographyPreset: 'utilityBody010',
                stylePreset: 'inkContrast'
              }
            }}
          >
            {listData}
          </StyledUnorderedList>
        )}
      </CardContent>
    </CardComposable>
  );
};
