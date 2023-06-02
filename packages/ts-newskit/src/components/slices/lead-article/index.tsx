import {
  TextBlock,
  Block,
  CardContent,
  CardComposable,
  Divider,
  Hidden,
  UnorderedList,
  LinkInline
} from 'newskit';
import React from 'react';
import {
  CardHeadlineLink,
  FullWidthCardMediaMob,
  TextLink
} from '../shared-styles';
import { TagAndFlag } from '../shared/tag-and-flag';
type ListData = {
  label: string;
  href: string;
};
export interface LeadArticleProps {
  headline: string;
  flag?: string;
  summary?: string;
  tagL1?: {
    label: string;
    href: string;
  };
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
  listData?: ListData[];
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
          <UnorderedList
            overrides={{
              marker: {
                size: 'iconSize005',
                spaceInline: 'space020',
                stylePreset: 'inkContrast'
              },
              marginBlockStart: 'space050',
              content: {
                typographyPreset: 'utilityBody010'
              }
            }}
          >
            {listData.map(({ label, href }, index) => {
              const hasHref = !!href;
              return hasHref ? (
                <LinkInline
                  overrides={{
                    stylePreset: 'inkContrast'
                  }}
                  key={index}
                  href={href}
                >
                  {label}
                </LinkInline>
              ) : (
                <>{label}</>
              );
            })}
          </UnorderedList>
        )}
      </CardContent>
    </CardComposable>
  );
};
