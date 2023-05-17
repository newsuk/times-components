import { Block, TextBlock, Tag, Divider, Flag } from 'newskit';
import React from 'react';
import { CardHeadlineLink, ContainerInline } from '../shared-styles';

export interface LeadArticleProps {
  heading: string;
  paragraph?: string;
  articleType?: string;
  readingTime?: string;
  url: string;
}

export const LeadArticle = ({
  heading,
  paragraph,
  articleType,
  readingTime,
  url
}: LeadArticleProps) => {
  return (
    <Block>
      {articleType && (
        <Block>
          <TextBlock typographyPreset="utilityButton010" as="span" tabIndex={0}>
            {articleType}
          </TextBlock>
        </Block>
      )}

      <CardHeadlineLink
        // expand
        href={url}
        overrides={{
          typographyPreset: 'editorialHeadline040',
          paddingBlockStart: 'space050'
        }}
        external={false}
      >
        {heading}
      </CardHeadlineLink>
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
      {(articleType || readingTime) && (
        <Block marginBlockStart="space050">
          <TextBlock typographyPreset="utilityButton010" as="span" tabIndex={0}>
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
            tabIndex={0}
          >
            {readingTime}
          </TextBlock>
        </Block>
      )}
    </Block>
  );
};
