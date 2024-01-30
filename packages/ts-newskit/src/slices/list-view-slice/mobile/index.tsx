import React, { Fragment } from 'react';
import {
  LeadArticle,
  LeadArticleProps
} from '../../../components/slices/lead-article';
import { StyledBlock } from '../styles';
import { CustomBlockLayout } from '../../shared';
import { Divider, TextBlock, Block } from 'newskit';
import { convertDateToMonth } from '../../../utils/date-formatting';
import { ListViewSliceProps } from '..';
import LoadMoreButton from '../load-more-button';
import { ListViewSliceLoading } from './loading';

export const ListViewSliceMobile = ({
  leadArticles,
  clickHandler,
  currentPage = 1,
  handlePageChange,
  isLoading,
  itemsPerPage = 10,
  totalItems,
  SectionAdMob
}: ListViewSliceProps) => {
  if (isLoading) {
    return <ListViewSliceLoading itemsPerPage={itemsPerPage} />;
  }

  const renderLoadMoreButton = currentPage * itemsPerPage < totalItems;
  const adSlots = [Math.ceil(itemsPerPage / 2)];
  for (let i = 1; i * itemsPerPage < totalItems; i++) {
    const slotVal = adSlots[adSlots.length - 1];
    adSlots.push(slotVal + itemsPerPage);
  }

  return (
    <CustomBlockLayout>
      {leadArticles
        .slice(0, currentPage * itemsPerPage)
        .map((item: LeadArticleProps, index) => {
          const renderAds = adSlots.includes(index + 1);

          return (
            <Fragment key={item.id}>
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
                index + 1 < itemsPerPage * currentPage &&
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
                  <SectionAdMob />
                </Block>
              )}
            </Fragment>
          );
        })}
      {renderLoadMoreButton && (
        <LoadMoreButton
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          title="Load more"
          disabled={isLoading}
          href={`?page=${currentPage + 1}`}
        />
      )}
    </CustomBlockLayout>
  );
};
