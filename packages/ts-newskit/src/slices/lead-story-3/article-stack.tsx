import { Block, Divider, Visible } from 'newskit';
import React from 'react';
import { FullWidthBlock } from '../../components/slices/shared-styles';
import { ClickHandlerType } from '../types';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { BlockNoTopMargin } from '../shared-styles';

export interface ArticlesProps {
  leadArticles: LeadArticleProps[];
  clickHandler: ClickHandlerType;
}

export const ArticleStack = ({ leadArticles, clickHandler }: ArticlesProps) => {
  return (
    <BlockNoTopMargin>
      {leadArticles &&
        leadArticles.map((article, index) => {
          const modifiedArticle =
            index === 0
              ? {
                  ...article,
                  imageTop: true,
                  textBlockMarginBlockStart: 'space050',
                  headlineTypographyPreset: {
                    xs: 'editorialHeadline040',
                    md: 'editorialHeadline060'
                  },
                  hasTopBorder: false
                }
              : {
                  ...article,
                  headlineTypographyPreset: {
                    xs: 'editorialHeadline030',
                    md: 'editorialHeadline020'
                  },
                  hideImage: true,
                  hasTopBorder: false
                };

          if (index === 0) {
            return (
              <Block key={modifiedArticle.id} marginBlock="space040">
                <Visible xs sm>
                  <LeadArticle
                    article={{ ...modifiedArticle }}
                    clickHandler={clickHandler}
                  />
                </Visible>
                <Visible md lg xl>
                  <LeadArticle
                    article={{ ...modifiedArticle, hideImage: true }}
                    clickHandler={clickHandler}
                  />
                </Visible>
              </Block>
            );
          }

          return (
            <React.Fragment key={modifiedArticle.id}>
              <FullWidthBlock
                paddingInline={{
                  xs: 'space045',
                  md: 'space000'
                }}
              >
                <Divider
                  overrides={{
                    stylePreset: 'dashedDivider'
                  }}
                />
              </FullWidthBlock>
              <Block marginBlock="space040">
                <Visible xs sm lg xl>
                  <LeadArticle
                    article={modifiedArticle}
                    clickHandler={clickHandler}
                  />
                </Visible>
                <Visible md>
                  <LeadArticle
                    article={{
                      ...modifiedArticle,
                      shortSummary:
                        index === leadArticles.length - 1
                          ? ''
                          : modifiedArticle.shortSummary
                    }}
                    clickHandler={clickHandler}
                  />
                </Visible>
              </Block>
            </React.Fragment>
          );
        })}
    </BlockNoTopMargin>
  );
};
