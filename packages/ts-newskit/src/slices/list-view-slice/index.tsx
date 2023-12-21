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
  onPageClick?: (currentPage: number) => void;
  itemsPerPage?: number;
  totalItems: number;
  isLoading?: boolean
};
export const ListViewSlice = ({
  leadArticles,
  clickHandler,
  currentPage,
  onPageClick,
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
          onPageClick={onPageClick}
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
            onPageClick={onPageClick}
            isLoading={isLoading}
          />
        </WrappedStackLayout>
      </Visible>
    </CustomBlockLayout>
  );
};
