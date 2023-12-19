import {
  PaginationFirstItem,
  PaginationPrevItem,
  PaginationItems,
  PaginationNextItem,
  PaginationLastItem,
  PaginationButton
} from 'newskit';
import React from 'react';
import { StyledPagination } from './styles';

type PaginationsProps = {
  totalItems: number;
  pageSize: number;
  defaultPage?: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};
export const Paginations = ({
  totalItems,
  pageSize,
  defaultPage = 1,
  currentPage,
  onPageChange
}: PaginationsProps) => {
  return (
    <StyledPagination
      totalItems={totalItems}
      pageSize={pageSize}
      defaultPage={defaultPage}
      aria-label={`pagination-${currentPage}`}
      onPageChange={onPageChange}
      page={currentPage}
    >
      <PaginationFirstItem overrides={{ stylePreset: 'interfaceBrand010' }} />
      <PaginationPrevItem overrides={{ stylePreset: 'interfaceBrand010' }} />
      <PaginationItems
        truncation
        siblings={2}
        boundaries={1}
        overrides={{
          stylePreset: 'interfaceBrand010',
          itemButton: ({ ...rest }) => {
            return (
              <PaginationButton
                overrides={{ stylePreset: 'interfaceBrand010' }}
                {...rest}
              >
                {rest.pageNumber}
              </PaginationButton>
            );
          }
        }}
      />
      <PaginationNextItem overrides={{ stylePreset: 'interfaceBrand010' }} />
      <PaginationLastItem overrides={{ stylePreset: 'interfaceBrand010' }} />
    </StyledPagination>
  );
};
