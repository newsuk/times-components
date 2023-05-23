import { Block, TextBlock } from 'newskit';
import React from 'react';
import { CardHeadlineLink } from '../shared-styles';
import { StyledUnorderedList } from './style';
import { TagAndFlag } from '../shared';

export interface LargeArticleProps {
  heading: string;
  paragraph?: string;
  tagL1?: string;
  flag?: string;
  url: string;
  listData?: string[];
  tag?: {
    label: string;
    href: string;
  };
  topArticle?: string;
}

export const LargeArticle = ({
  heading,
  paragraph,
  tagL1,
  flag,
  url,
  listData,
  tag,
  topArticle
}: LargeArticleProps) => {
  return (
    <Block>
      {tagL1 && (
        <Block>
          <TextBlock typographyPreset="utilityButton010" as="span">
            {tagL1.toUpperCase()}
          </TextBlock>
        </Block>
      )}
      <CardHeadlineLink
        href={url}
        overrides={{
          typographyPreset: topArticle
            ? 'editorialHeadline040'
            : 'editorialHeadline020',
          marginBlockStart: tagL1 ? 'space040' : 'space000'
        }}
        external={false}
      >
        {heading}
      </CardHeadlineLink>
      {paragraph && (
        <TextBlock
          typographyPreset={{
            xs: 'editorialParagraph020',
            md: 'editorialParagraph010'
          }}
          marginBlockStart="space050"
          as="p"
        >
          {paragraph}
        </TextBlock>
      )}
      {(tag || flag) && (
        <TagAndFlag tag={tag} flag={flag} marginBlockStart="space050" />
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
    </Block>
  );
};
