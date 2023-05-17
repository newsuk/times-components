import { Block, TextBlock, Divider } from 'newskit';
import React from 'react';
import { CardHeadlineLink, ContainerInline } from '../shared-styles';
import { StyledUnorderedList } from './style';

export interface LeadArticleProps {
  heading: string;
  paragraph?: string;
  articleType?: string;
  readingTime?: string;
  url: string;
  listData?: string[];
}

export const LeadArticle = ({
  heading,
  paragraph,
  articleType,
  readingTime,
  url,
  listData
}: LeadArticleProps) => {
  return (
    <Block>
      {articleType && (
        <Block>
          <TextBlock typographyPreset="utilityButton010" as="span">
            {articleType.toUpperCase()}
          </TextBlock>
        </Block>
      )}
      <CardHeadlineLink
        href={url}
        overrides={{
          typographyPreset: 'editorialHeadline040',
          marginBlockStart: 'space040'
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
      {(articleType || readingTime) && (
        <Block marginBlockStart="space050">
          <TextBlock typographyPreset="utilityButton010" as="span">
            {articleType}
          </TextBlock>
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
            typographyPreset="utilityLabel010"
            stylePreset="inkSubtle"
            as="span"
          >
            {readingTime}
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
    </Block>
  );
};
