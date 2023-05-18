import {
  TextBlock,
  Visible,
  Block,
  Divider,
  CardContent,
  CardComposable,
  Flag,
  Tag
} from 'newskit';
import React from 'react';
import {
  ContainerInline,
  CardHeadlineLink,
  FullWidthCardMediaMob,
  TextLink
} from '../shared-styles';
import { StyledDivider } from './styles';

export interface LeadArticleProps {
  headline: string;
  readingTime: string;
  summary: string;
  subHeadline?: string;
  caption: string;
  image: string;
  url: string;
  articleType?: {
    label: string;
    href: string;
  };
  hasTagOrTimeToRead?: boolean;
  imageTop?: boolean;
}
export const LeadArticle = ({
  headline,
  readingTime,
  summary,
  subHeadline,
  caption,
  image,
  url,
  articleType,
  hasTagOrTimeToRead,
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
        xs: `media 
             content`,
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
          <StyledDivider overrides={{ stylePreset: 'dashedDivider' }} />
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
          expand={!articleType}
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
        <Visible xs={hasTagOrTimeToRead} sm={hasTagOrTimeToRead} md lg xl>
          {articleType && (
            <TextLink
              overrides={{
                ...stylePresets
              }}
              href={articleType.href}
            >
              {articleType.label}
            </TextLink>
          )}
          {articleType &&
            readingTime && (
              <ContainerInline>
                <Divider
                  vertical
                  overrides={{
                    marginInline: 'space020'
                  }}
                />
              </ContainerInline>
            )}
          {readingTime && (
            <Flag
              size="small"
              overrides={{
                ...stylePresets,
                stylePreset: 'inkSubtle',
                typographyPreset: 'utilityLabel010'
              }}
            >
              {readingTime}
            </Flag>
          )}
        </Visible>
      </CardContent>
    </CardComposable>
  );
};
