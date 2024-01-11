import React from 'react';
import { LeadArticleProps } from '../../components/slices/lead-article';
import { ClickHandlerType } from '../types';
import { CustomBlockLayout, WrappedStackLayout } from '../shared';
import { Visible } from 'newskit';
import { ListViewSliceMobile } from './mobile';
import { ListViewSliceDesktop } from './desktop';

export type LeadArticleWithDateProps = Omit<
  LeadArticleProps,
  'datePublished'
> & { datePublished: string };
export type ListViewSliceProps = {
  leadArticles: LeadArticleWithDateProps[];
  clickHandler: ClickHandlerType;
  currentPage?: number;
  handlePageChange: (page: number) => void;
  onPageChange?: () => void;
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
  onPageChange,
  itemsPerPage = 10,
  totalItems,
  isLoading = false,
  StickyAd,
  SectionAd
}: ListViewSliceProps) => {
  const modifiedLeadArticles = leadArticles.map(item => ({
    ...item,
    headlineTypographyPreset: 'editorialHeadline020',
    isLeadImage: false,
    isListView: true
  }));

  const sliceProps = {
    leadArticles: modifiedLeadArticles,
    clickHandler,
    currentPage,
    handlePageChange,
    itemsPerPage,
    totalItems,
    isLoading,
    StickyAd,
    SectionAd
  };
  return (
    <CustomBlockLayout>
      <Visible md lg xl>
        <ListViewSliceDesktop onPageChange={onPageChange} {...sliceProps} />
      </Visible>
      <Visible xs sm>
        <WrappedStackLayout>
          <ListViewSliceMobile {...sliceProps} />
        </WrappedStackLayout>
      </Visible>
    </CustomBlockLayout>
  );
};
