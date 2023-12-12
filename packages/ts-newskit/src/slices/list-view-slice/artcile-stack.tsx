import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { Divider, Block, Visible, Hidden } from 'newskit';
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
            <Visible md>
              {leadArticle.length > 1 &&
                index < leadArticle.length - 1 &&
                fifthArticle.id !== item.id && (
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
            </Hidden>
            <div style={{ marginLeft: '-170px', marginRight: '-30px' }}>
              {fifthArticle.id === item.id && (
                <>
                  <Visible md>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '10px 0',
                        borderTop: '1px solid black',
                        marginTop: '40px'
                      }}
                    >
                      advertisement
                    </div>
                  </Visible>
                  <StyledAdBlock />
                </>
              )}
            </div>
          </>
        );
      })}
    </>
  );
};
