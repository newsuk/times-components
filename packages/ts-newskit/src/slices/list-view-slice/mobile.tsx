import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { StyledAdBlock, StyledBlock } from './styles';
import { CustomBlockLayout } from '../shared';
import { Divider, TextBlock, Block, Stack } from 'newskit';
import { convertDateToMonth } from '../../utils/date-formatting';
import { ListViewSliceProps } from '.';
import LoadMoreButton from './load-more-button';

export const ListViewSliceMobile = ({
  leadArticles,
  clickHandler,
  currentPage = 1,
  onMobilePageClick,
  isLoading
}: Omit<ListViewSliceProps, 'totalItems'>) => {
  return (
    <CustomBlockLayout>
      {leadArticles.map((item: LeadArticleProps, index) => {
        const renderAds = (index + 1) % 10 === 5;
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
            {!renderAds &&
              index !== leadArticles.length - 1 && (
                <Block marginBlock="space040">
                  <Divider
                    overrides={{
                      stylePreset: 'dashedDivider'
                    }}
                  />
                </Block>
              )}
            {renderAds && (
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
      <LoadMoreButton
        onClick={() => {
          history.pushState(null, '', `?page=${currentPage + 1}`);
          onMobilePageClick && onMobilePageClick(currentPage + 1);
        }}
        title="Load more"
        disabled={isLoading}
      />
    </CustomBlockLayout>
  );
};
