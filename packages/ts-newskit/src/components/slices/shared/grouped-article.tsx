import React from 'react';
import { Block, GridLayout } from 'newskit';
import { TextLink } from '../shared-styles';
import { LeadArticle, LeadArticleProps } from '../lead-article/index';
import { FullWidthBlock } from '../shared-styles/index';
import { StyledDivider } from '../../../slices/lead-story-1/styles';

export interface GroupedArticleProps {
  tagL1: {
    label: string;
    href: string;
  };
  articles: LeadArticleProps[];
}

export const GroupedArticle = ({ articles, tagL1 }: GroupedArticleProps) => {
  const modifiedGroupedArticles = articles.map(article => ({
    ...article,
    imageTop: true,
    typographyPreset: 'editorialHeadline020'
  }));

  return (
    <Block>
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
      <GridLayout>
        {modifiedGroupedArticles.map(
          (article: LeadArticleProps, articleIndex: number) => {
            const isSecondDivider = articleIndex === 1;
            return (
              <React.Fragment key={article.headline}>
                {isSecondDivider && (
                  <FullWidthBlock marginBlock="space040">
                    <StyledDivider
                      overrides={{
                        stylePreset: 'dashedDivider'
                      }}
                    />
                  </FullWidthBlock>
                )}
                <LeadArticle {...article} />
              </React.Fragment>
            );
          }
        )}
      </GridLayout>
    </Block>
  );
};
