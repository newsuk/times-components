import {
  TextBlock,
  Visible,
  Block,
  Divider,
  CardContent,
  CardComposable,
  Flag
} from 'newskit';
import React from 'react';
import {
  ContainerInline,
  CardHeadlineLink,
  FullWidthCardMediaMob
} from '../shared-styles';
import { ColouredText, StyledDivider } from './styles';

export interface LeadStoryProps {
  headline: string;
  color?: string;
  readingTime: string;
  summary: string;
  subHeadline?: string;
  caption: string;
  image: string;
  url: string;
  articleType?: string;
}

export const LeadStory = ({
  headline,
  color,
  readingTime,
  summary,
  subHeadline,
  caption,
  image,
  url,
  articleType
}: LeadStoryProps) => {
  const stylePresets = {
    typographyPreset: 'utilityButton010',
    stylePreset: 'inkBrand010',
    paddingBlockStart: 'space050',
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
        md: `content media`
      }}
      columnGap="space040"
      columns={{ md: '3fr 5fr' }}
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
          paddingBlockStart="space020"
          typographyPreset="utilityMeta010"
        >
          {caption}
        </TextBlock>
      </Block>
      <CardContent alignContent="start">
        <StyledDivider overrides={{ stylePreset: 'dashedDivider' }} />
        <Visible md lg xl>
          {subHeadline && (
            <ColouredText
              size="small"
              overrides={{
                ...stylePresets
              }}
              $color={color}
            >
              {subHeadline}
            </ColouredText>
          )}
        </Visible>
        <CardHeadlineLink
          expand
          href={url}
          overrides={{
            typographyPreset: 'editorialHeadline040',
            paddingBlockStart: 'space050'
          }}
          external={false}
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
        <Visible md lg xl>
          <ColouredText
            size="small"
            overrides={{
              ...stylePresets
            }}
            $color={color}
          >
            {articleType}
          </ColouredText>
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
          <Flag
            size="small"
            overrides={{
              ...stylePresets,
              stylePreset: 'flagMinimalPrimary'
            }}
          >
            {readingTime}
          </Flag>
        </Visible>
      </CardContent>
    </CardComposable>
  );
};
