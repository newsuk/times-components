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
  image: string;
  url: string;
  tag?: {
    label: string;
    href: string;
  };
  imageTop?: boolean;
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
  imageTop
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
      <Block>
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
      <CardContent alignContent="start">
        {!imageTop && (
          <Divider
            overrides={{
              stylePreset: 'dashedDivider'
            }}
          />
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
            typographyPreset: imageTop
              ? { xs: 'editorialHeadline040', md: 'editorialHeadline030' }
              : 'editorialHeadline040',
            marginBlockStart: 'space050'
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
        <Block marginBlockEnd="space040">
          {(tag || flag) && (
            <TagAndFlag tag={tag} flag={flag} marginBlockStart="space040" />
          )}
        </Block>
      </CardContent>
    </CardComposable>
  );
};
