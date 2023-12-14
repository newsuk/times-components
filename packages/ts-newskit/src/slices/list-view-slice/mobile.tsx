import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { StyledAdBlock, StyledBlock } from './styles';
import { CustomBlockLayout } from '../shared';
import { Divider, TextBlock, Block, Visible, Stack } from 'newskit';

export interface ListViewSliceProps {
  leadArticle: LeadArticleProps[];
  clickHandler: ClickHandlerType;
}

export const ListViewSliceMobile = ({
  leadArticle,
  clickHandler
}: ListViewSliceProps) => {
  function formatDate(publishDate: string) {
    const timestamp = new Date(publishDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return timestamp;
  }

  return (
    <CustomBlockLayout>
      {leadArticle.map((item: LeadArticleProps, index) => {
        return (
          <Visible xs sm>
            <TextBlock
              typographyPreset={{
                xs: 'utilityMeta010',
                md: 'utilityMeta005'
              }}
              stylePreset={{
                xs: 'utilityButton010',
                md: 'utilityButton005'
              }}
              as="span"
              marginInlineEnd="space060"
              marginBlockEnd="space040"
            >
              {item.datePublished && formatDate(item.datePublished)}
            </TextBlock>
            <StyledBlock>
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
            </StyledBlock>
            {index !== 4 && (
              <Block marginBlock="space040">
                <Divider
                  overrides={{
                    stylePreset: 'dashedDivider'
                  }}
                />
              </Block>
            )}
            {index === 4 && (
              <>
                <Stack
                  flow="horizontal-center"
                  stackDistribution="center"
                  marginBlock="space030"
                >
                  ADVERTISEMENT
                </Stack>
                <StyledAdBlock />
              </>
            )}
          </Visible>
        );
      })}
    </CustomBlockLayout>
  );
};
