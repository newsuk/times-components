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
  setCurrentPage?: (currentPage: number) => void;
};
export const ListViewSlice = ({
  leadArticles,
  clickHandler,
  currentPage,
  setCurrentPage
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
          setCurrentPage={setCurrentPage}
        />
      </Visible>
      <Visible xs sm>
        <WrappedStackLayout>
          <ListViewSliceMobile
            leadArticles={mordifiedLeadArticles}
            clickHandler={clickHandler}
          />
        </WrappedStackLayout>
      </Visible>
    </CustomBlockLayout>
  );
};
