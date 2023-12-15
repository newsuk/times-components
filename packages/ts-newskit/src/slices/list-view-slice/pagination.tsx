import {
  Pagination,
  PaginationFirstItem,
  PaginationPrevItem,
  PaginationItems,
  PaginationButton,
  PaginationNextItem,
  PaginationLastItem
} from 'newskit';
import React from 'react';

export const Paginations = () => {
  return (
    <Pagination
      totalItems={232}
      pageSize={10}
      defaultPage={9}
      aria-label="input for selected item"
    >
      <PaginationFirstItem overrides={{ stylePreset: 'interfaceBrand010' }} />
      <PaginationPrevItem overrides={{ stylePreset: 'interfaceBrand010' }} />
      <PaginationItems
        truncation
        siblings={3}
        boundaries={1}
        overrides={{
          stylePreset: 'interfaceBrand010',
          itemButton: ({ selected, ...rest }) => {
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
    </Pagination>
  );
};
