import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { StyledAdBlock, StyledBlock } from './styles';
import { CustomBlockLayout } from '../shared';
import { Divider, TextBlock, Block, Stack } from 'newskit';
import { convertDateToMonth } from '../../utils/date-formatting';

export type ListViewSliceProps = {
  leadArticle: LeadArticleProps[];
  clickHandler: ClickHandlerType;
};

export const ListViewSliceMobile = ({
  leadArticle,
  clickHandler
}: ListViewSliceProps) => {
  return (
    <CustomBlockLayout>
      {leadArticle.map((item: LeadArticleProps, index) => {
        return (
          <>
            <TextBlock
              typographyPreset="utilityLabel005"
              stylePreset="inkNonEssential"
              as="span"
              marginInlineEnd="space060"
              marginBlockEnd="space040"
            >
              {item.datePublished && convertDateToMonth(item.datePublished)}
            </TextBlock>
            <StyledBlock>
              <LeadArticle
                article={{
                  ...item,
                  hasTopBorder: false
                }}
                clickHandler={clickHandler}
              />
            </StyledBlock>
            {index !== 4 &&
              index !== leadArticle.length - 1 && (
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
          </>
        );
      })}
    </CustomBlockLayout>
  );
};
