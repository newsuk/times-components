import {
  TextBlock,
  Image,
  Stack,
  Visible,
  Block,
  Headline,
  LinkInline
} from 'newskit';
import React from 'react';
import { StyledTextBlock, StyledTextStack, Styledinterviewee } from './styles';

interface LeadStoryPropsDataProp {
  headline: string;
  color: string;
  readingTime: string;
  summary: string;
  bylines: string;
  interviewee: string;
  caption: string;
  image: string;
  url: string;
}

export const LeadStory = ({
  headline,
  color,
  readingTime,
  summary,
  bylines,
  interviewee,
  caption,
  image,
  url
}: LeadStoryPropsDataProp) => {
  return (
    <Stack flow={{ sm: 'vertical-center', md: 'horizontal-stretch' }}>
      <StyledTextStack marginInlineEnd={{ md: 'space040' }}>
        <Styledinterviewee
          color={color}
          paddingBlockStart={{
            xs: 'space040',
            md: 'space020',
            lg: 'space040'
          }}
          paddingBlockEnd="space020"
          typographyPreset="newPreset090"
        >
          {interviewee}
        </Styledinterviewee>
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
          paddingBlockEnd={{ xs: 'space020' }}
        >
          <LinkInline
            overrides={{
              stylePreset: 'leadStoryDescription'
            }}
            external={false}
            href={url}
          >
            {summary}
          </LinkInline>
        </TextBlock>
        <TextBlock
          stylePreset="leadStoryTextColor"
          typographyPreset="newPreset100"
          paddingBlockStart="space020"
        >
          {readingTime}
        </TextBlock>
      </StyledTextStack>
      <Block
        paddingBlockStart={{
          xs: 'space040',
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
          >
            {caption}
          </TextBlock>
        </Block>
      </Block>
      <Visible lg xl>
        <Stack flow="horizontal-bottom" paddingInlineStart="space010">
          <StyledTextBlock stylePreset="leadStoryTextColor">
            {bylines}
          </StyledTextBlock>
        </Stack>
      </Visible>
    </Stack>
  );
};
