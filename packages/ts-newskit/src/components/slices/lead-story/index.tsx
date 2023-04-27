import {
  TextBlock,
  Image,
  Stack,
  Visible,
  Block,
  Headline,
  LinkInline,
  useTheme,
  Divider
} from 'newskit';
import React from 'react';
import { StyledTextBlock, StyledTextStack } from './styles';
import { ContainerInline, ColouredText } from '../shared-styles';

export interface LeadStoryProps {
  headline: string;
  color?: string;
  readingTime: string;
  summary: string;
  bylines: string;
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
  bylines,
  subHeadline,
  caption,
  image,
  url,
  articleType
}: LeadStoryProps) => {
  const theme = useTheme();
  return (
    <Stack flow={{ sm: 'vertical-center', md: 'horizontal-stretch' }}>
      <StyledTextStack marginInlineEnd={{ md: 'space040' }}>
        <ColouredText
          $color={color}
          paddingBlockStart={{
            xs: 'space040',
            md: 'space020',
            lg: 'space040'
          }}
          paddingBlockEnd="space020"
          typographyPreset="newPreset090"
        >
          {subHeadline}
        </ColouredText>
        <Headline
          headingAs="h1"
          overrides={{
            typographyPreset: 'newPreset080',
            paddingBlockEnd: 'space020'
          }}
        >
          <LinkInline
            overrides={{
              stylePreset: 'leadStoryHeader'
            }}
            external={false}
            href={url}
          >
            {headline}
          </LinkInline>
        </Headline>
        <TextBlock
          typographyPreset={{
            xs: 'editorialParagraph020',
            md: 'editorialParagraph010'
          }}
        >
          <LinkInline
            overrides={{
              stylePreset: 'leadStoryDescription',
              paddingBlockEnd: 'space020'
            }}
            external={false}
            href={url}
          >
            {summary}
          </LinkInline>
        </TextBlock>
        <Block>
          <ColouredText
            typographyPreset="articleListArticleType"
            as="span"
            $color={color}
            paddingBlockStart="space010"
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
          <TextBlock
            typographyPreset="articleListTimeToRead"
            stylePreset="articleListTimeToRead"
            as="span"
            paddingBlockStart="space010"
          >
            {readingTime}
          </TextBlock>
        </Block>
      </StyledTextStack>
      <Block
        paddingBlockStart={{
          xs: 'space040',
          md: 'space000'
        }}
        marginInline={{
          xs: `-${theme.spacePresets.space045}`,
          md: 'space000'
        }}
      >
        <LinkInline external={false} href={url}>
          <Image
            src={image}
            alt={headline}
            width="100%"
            height="100%"
            loadingAspectRatio="3:2"
          />
        </LinkInline>
        <Block>
          <TextBlock
            stylePreset="leadStoryTextColor"
            paddingBlockStart="space020"
            typographyPreset="newPreset100"
            marginInline={{
              xs: 'space045',
              md: 'space000'
            }}
          >
            {caption}
          </TextBlock>
        </Block>
      </Block>
      <Visible lg xl>
        <Stack flow="horizontal-bottom" paddingInlineStart="space010">
          <StyledTextBlock
            stylePreset="leadStoryTextColor"
            typographyPreset="newPreset100"
            marginInlineEnd="space045"
          >
            {bylines}
          </StyledTextBlock>
        </Stack>
      </Visible>
    </Stack>
  );
};
