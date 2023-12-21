import React from 'react';
import { LeadArticleProps } from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { CustomBlockLayout, WrappedStackLayout } from '../shared';
import { Visible } from 'newskit';
import { ListViewSliceMobile } from './mobile';
import { ListViewSliceDesktop } from './desktop';

export type ListViewSliceProps = {
  leadArticles: LeadArticleProps[];
  clickHandler: ClickHandlerType;
  articleWithAdSlot?: LeadArticleProps;
  currentPage?: number;
  onDesktopPageClick?: (currentPage: number) => void;
  onMobilePageClick?: (currentPage: number) => void;
  itemsPerPage?: number;
  totalItems: number;
  isLoading?: boolean;
};
export const ListViewSlice = ({
  leadArticles,
  clickHandler,
  currentPage,
  onDesktopPageClick,
  onMobilePageClick,
  itemsPerPage = 10,
  totalItems,
  isLoading = false
}: ListViewSliceProps) => {
  const mordifiedLeadArticles = leadArticles.map(item => ({
    ...item,
    headlineTypographyPreset: 'editorialHeadline020',
    isLeadImage: false
  }));

  return (
    <CustomBlockLayout>
      <Visible md lg xl>
        <ListViewSliceDesktop
          leadArticles={mordifiedLeadArticles}
          clickHandler={clickHandler}
          currentPage={currentPage}
          onDesktopPageClick={onDesktopPageClick}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          isLoading={isLoading}
        />
      </Visible>
      <Visible xs sm>
        <WrappedStackLayout>
          <ListViewSliceMobile
            leadArticles={mordifiedLeadArticles}
            clickHandler={clickHandler}
            onMobilePageClick={onMobilePageClick}
            isLoading={isLoading}
          />
        </WrappedStackLayout>
      </Visible>
    </CustomBlockLayout>
  );
};
