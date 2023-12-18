import {
  Pagination,
  PaginationFirstItem,
  PaginationPrevItem,
  PaginationItems,
  PaginationNextItem,
  PaginationLastItem
} from 'newskit';
import React from 'react';
import { StyledPaginationButton } from './styles';

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
    <Pagination
      totalItems={totalItems}
      pageSize={pageSize}
      defaultPage={defaultPage}
      aria-label={`pagination-${currentPage}`}
      onPageChange={onPageChange}
      page={currentPage}
    >
      <PaginationFirstItem
        overrides={{ stylePreset: 'interfaceBrand010' }}
        style={{ backgroundColor: 'transparent' }}
      />
      <PaginationPrevItem
        overrides={{ stylePreset: 'interfaceBrand010' }}
        style={{ backgroundColor: 'transparent' }}
      />
      <PaginationItems
        truncation
        siblings={2}
        boundaries={1}
        overrides={{
          stylePreset: 'interfaceBrand010',
          itemButton: ({ selected, ...rest }) => {
            return (
              <StyledPaginationButton
                selected={selected}
                overrides={{ stylePreset: 'interfaceBrand010' }}
                {...rest}
              >
                {rest.pageNumber}
              </StyledPaginationButton>
            );
          }
        }}
      />
      <PaginationNextItem
        overrides={{ stylePreset: 'interfaceBrand010' }}
        style={{ backgroundColor: 'transparent' }}
      />
      <PaginationLastItem
        overrides={{ stylePreset: 'interfaceBrand010' }}
        style={{ backgroundColor: 'transparent' }}
      />
    </Pagination>
  );
};
