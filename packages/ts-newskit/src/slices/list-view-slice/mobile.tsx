import React from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../components/slices/lead-article';
import { StyledBlock } from './styles';
import { CustomBlockLayout } from '../shared';
import { Divider, TextBlock, Block } from 'newskit';
import { convertDateToMonth } from '../../utils/date-formatting';
import { ListViewSliceProps } from '.';
import LoadMoreButton from './load-more-button';

export const ListViewSliceMobile = ({
  leadArticles,
  clickHandler,
  currentPage = 1,
  handlePageChange,
  isLoading,
  itemsPerPage = 10,
  totalItems,
  SectionAd
}: ListViewSliceProps) => {
  const renderLoadMoreButton = currentPage * itemsPerPage < totalItems;

  return (
    <CustomBlockLayout>
      {leadArticles
        .slice(0, itemsPerPage)
        .map((item: LeadArticleProps, index) => {
          const renderAds = index + 1 === Math.ceil(itemsPerPage / 2);

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
                index + 1 < itemsPerPage &&
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
                <Block marginBlock="space040">
                  <SectionAd />
                </Block>
              )}
            </>
          );
        })}
      {renderLoadMoreButton && (
        <LoadMoreButton
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          title="Load more"
          disabled={isLoading}
          href={`${window.location.pathname}?page=${currentPage + 1}`}
        />
      )}
    </CustomBlockLayout>
  );
};
