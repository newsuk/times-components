import { Block, TextBlock, Divider } from 'newskit';
import React from 'react';
import { CardHeadlineLink, ContainerInline, TextLink } from '../shared-styles';
import { StyledUnorderedList } from './style';

export interface LargeArticleProps {
  heading: string;
  paragraph?: string;
  tagL1?: string;
  flag?: string;
  url: string;
  listData?: string[];
  tag?: string;
}

export const LargeArticle = ({
  heading,
  paragraph,
  tagL1,
  flag,
  url,
  listData,
  tag
}: LargeArticleProps) => {
  return (
    <>
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
          typographyPreset: 'editorialHeadline020',
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
        <Block marginBlockStart="space050">
          <TextLink
            overrides={{
              typographyPreset: 'utilityButton010',
              stylePreset: 'inkBrand010'
            }}
            href={url}
          >
            {tag}
          </TextLink>
          {tag &&
            flag && (
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
            typographyPreset="utilityLabel010"
            stylePreset="inkSubtle"
            as="span"
          >
            {flag}
          </TextBlock>
        </Block>
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
    </>
  );
};
