import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { Divider, Block, Visible, Hidden, Stack } from 'newskit';
import { StyledAdBlock, AdBlockWrapperMedium } from './styles';

export interface ListViewSliceProps {
  leadArticle: LeadArticleProps[];
  clickHandler: ClickHandlerType;
  articleWithAdSlot: LeadArticleProps;
}

export const ArticleStack = ({
  leadArticle,
  articleWithAdSlot,
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
            <AdBlockWrapperMedium>
              {articleWithAdSlot.id === item.id && (
                <>
                  <Visible md>
                    <Divider
                      overrides={{
                        marginBlockEnd: 'space030',
                        marginBlockStart: 'space060',
                        stylePreset: 'lightDivider'
                      }}
                    />
                    <Stack
                      flow="horizontal-center"
                      stackDistribution="center"
                      marginBlockEnd="space030"
                    >
                      ADVERTISEMENT
                    </Stack>
                    <StyledAdBlock />
                  </Visible>
                </>
              )}
            </AdBlockWrapperMedium>
          </>
        );
      })}
    </>
  );
};
