// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import React, { Fragment } from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { Divider, Block, Visible, Hidden } from 'newskit';
import { AdBlockWrapperMedium } from './styles';
import { ClickHandlerType } from '../types';

type ArticleStackProps = {
  leadArticles: LeadArticleProps[];
  articleWithAdSlot: LeadArticleProps;
  SectionAd: React.FunctionComponent;
  clickHandler: ClickHandlerType;
};

export const ArticleStack = ({
  leadArticles,
  articleWithAdSlot,
  SectionAd,
  clickHandler
}: ArticleStackProps) => {
  return (
    <>
      {leadArticles.map((item: LeadArticleProps, index: number) => {
        return (
          <Fragment key={item.id}>
            <LeadArticle
              article={{
                ...item,
                hasTopBorder: false,
                contentWidth: {
                  md: '407px auto',
                  lg: '331px auto',
                  xl: '470px auto'
                },
                columnGap: {
                  md: '32px'
                }
              }}
              clickHandler={clickHandler}
            />
            <Visible md>
              {leadArticles.length > 1 &&
                index < leadArticles.length - 1 &&
                articleWithAdSlot &&
                articleWithAdSlot.id !== item.id && (
                  <Block marginBlock="space040">
                    <Divider
                      overrides={{
                        stylePreset: 'dashedDivider'
                      }}
                    />
                  </Block>
                )}
            </Visible>
            <Hidden md>
              {leadArticles.length > 1 &&
                index < leadArticles.length - 1 && (
                  <Block marginBlock="space040">
                    <Divider
                      overrides={{
                        stylePreset: 'dashedDivider'
                      }}
                    />
                  </Block>
                )}
            </Hidden>
            <AdBlockWrapperMedium>
              {articleWithAdSlot &&
                articleWithAdSlot.id === item.id && (
                  <Visible md>
                    <Divider
                      overrides={{
                        marginBlockEnd: 'space030',
                        marginBlockStart: 'space060',
                        stylePreset: 'lightDivider'
                      }}
                    />
                    <SectionAd />
                  </Visible>
                )}
            </AdBlockWrapperMedium>
          </Fragment>
        );
      })}
    </>
  );
};
