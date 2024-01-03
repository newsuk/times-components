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
  handlePageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems: number;
  isLoading?: boolean;
  StickyAd: React.FunctionComponent;
  SectionAd: React.FunctionComponent;
};
export const ListViewSlice = ({
  leadArticles,
  clickHandler,
  currentPage,
  handlePageChange,
  itemsPerPage = 10,
  isLoading = false,
  StickyAd,
  SectionAd
}: ListViewSliceProps) => {
  const mordifiedLeadArticles = leadArticles.map(item => ({
    ...item,
    headlineTypographyPreset: 'editorialHeadline020',
    isLeadImage: false
  }));

  const sliceProps = {
    leadArticles: mordifiedLeadArticles,
    clickHandler,
    currentPage,
    handlePageChange,
    itemsPerPage,
    totalItems: leadArticles.length,
    isLoading,
    StickyAd,
    SectionAd
  };

  return (
    <CustomBlockLayout>
      <Visible md lg xl>
        <ListViewSliceDesktop {...sliceProps} />
      </Visible>
      <Visible xs sm>
        <WrappedStackLayout>
          <ListViewSliceMobile {...sliceProps} />
        </WrappedStackLayout>
      </Visible>
    </CustomBlockLayout>
  );
};
