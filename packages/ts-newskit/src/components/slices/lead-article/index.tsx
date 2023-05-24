import {
  TextBlock,
  Visible,
  Block,
  CardContent,
  CardComposable,
  Tag,
  Divider
} from 'newskit';
import React from 'react';
import { CardHeadlineLink, FullWidthCardMediaMob } from '../shared-styles';
import { TagAndFlag } from '../shared';

export interface LeadArticleProps {
  headline: string;
  flag?: string;
  summary: string;
  subHeadline?: string;
  caption: string;
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
}
export const LeadArticle = ({
  headline,
  flag,
  summary,
  subHeadline,
  caption,
  image,
  url,
  tag,
  imageTop,
  hasTopBorder = true,
  contentTop,
  typographyPreset
}: LeadArticleProps) => {
  const stylePresets = {
    typographyPreset: 'utilityButton010',
    stylePreset: 'inkBrand010',
    marginBlockStart: 'space050',
    paddingInline: 'space000',
    paddingBlock: 'space000',
    iconSize: 'iconSize010',
    spaceInline: 'space010'
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
        <Block marginBlockEnd={imageTop ? 'space050' : 'space000'}>
          <FullWidthCardMediaMob
            media={{
              src: image,
              alt: headline,
              loadingAspectRatio: '3:2'
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

        {subHeadline && (
          <Visible md lg xl>
            <Tag
              size="small"
              overrides={{
                ...stylePresets
              }}
            >
              {subHeadline}
            </Tag>
          </Visible>
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
        <TextBlock
          typographyPreset={{
            xs: 'editorialParagraph020',
            md: 'editorialParagraph010'
          }}
          marginBlockStart="space050"
          as="p"
        >
          {summary}
        </TextBlock>
        {(tag || flag) && (
          <TagAndFlag tag={tag} flag={flag} marginBlockStart="space040" />
        )}
      </CardContent>
    </CardComposable>
  );
};
