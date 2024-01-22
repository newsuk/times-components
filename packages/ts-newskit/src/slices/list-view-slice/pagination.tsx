import {
  PaginationPrevItem,
  PaginationItems,
  PaginationNextItem
} from 'newskit';
import React from 'react';
import { StyledPagination, StyledPaginationButton } from './styles';

type PaginationsProps = {
  totalItems: number;
  pageSize: number;
  defaultPage?: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  onPageChange?: () => void;
  isLoading?: boolean;
};

export const Paginations = ({
  totalItems,
  pageSize,
  defaultPage = 1,
  currentPage,
  handlePageChange,
  onPageChange,
  isLoading
}: PaginationsProps) => {
  return (
    <StyledPagination
      totalItems={totalItems}
      pageSize={pageSize}
      defaultPage={defaultPage}
      aria-label={`pagination-${currentPage}`}
      page={currentPage}
      onPageChange={onPageChange}
    >
      <PaginationPrevItem
        overrides={{ stylePreset: 'interfaceBrand010' }}
        onClick={() => handlePageChange(currentPage - 1)}
      />
      <PaginationItems
        truncation={true}
        siblings={2}
        boundaries={0}
        overrides={{
          stylePreset: 'interfaceBrand010',
          itemButton: ({ pageNumber, ...rest }) => {
            return (
              <StyledPaginationButton
                {...rest}
                overrides={{
                  minHeight: { xs: undefined },
                  minWidth: { xs: undefined },
                  stylePreset: 'interfaceBrand010'
                }}
                disabled={isLoading}
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  pageNumber && handlePageChange(pageNumber);
                  onPageChange && onPageChange();
                }}
                href={`?page=${pageNumber}`}
              >
                {pageNumber}
              </StyledPaginationButton>
            );
          }
        }}
      />
      <PaginationNextItem
        overrides={{ stylePreset: 'interfaceBrand010' }}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </StyledPagination>
  );
};
