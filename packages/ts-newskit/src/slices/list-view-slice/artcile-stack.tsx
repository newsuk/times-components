import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { Divider, Block } from 'newskit';
import { StyledAdBlock } from './styles';

export interface ListViewSliceProps {
  leadArticle: LeadArticleProps[];
  clickHandler: ClickHandlerType;
  fifthArticle: LeadArticleProps;
}

export const ArticleStack = ({
  leadArticle,
  fifthArticle,
  clickHandler
}: ListViewSliceProps) => {
  return (
    <>
      {leadArticle.map((item: LeadArticleProps, index: number) => {
        return (
          <>
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
            {leadArticle.length > 1 &&
              index < leadArticle.length - 1 && (
                <Block marginBlock="space040">
                  <Divider
                    overrides={{
                      stylePreset: 'dashedDivider'
                    }}
                  />
                </Block>
              )}
            <div style={{ marginLeft: '-170px', marginRight: '-30px' }}>
              {fifthArticle.id === item.id && (
                <StyledAdBlock>Billboard 970 x 250</StyledAdBlock>
              )}
            </div>
          </>
        );
      })}
    </>
  );
};
