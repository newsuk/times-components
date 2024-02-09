// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

import {
  Block,
  styled,
  getMediaQueryFromTheme,
  TextBlock,
  Pagination,
  PaginationButton,
  getSpacingCssFromTheme,
  getColorCssFromTheme,
  getSizingCssFromTheme,
  MQ
} from 'newskit';

export const StyledBlock = styled(Block)`
  .lead-image-container {
    display: none;
  }

  ${getMediaQueryFromTheme('md')} {
    width: 579px;
    .lead-image-container {
      display: inline;
    }
  }
  ${getMediaQueryFromTheme('lg')} {
    width: 501px;
    .lead-image-container {
      display: inline;
    }
  }
  ${getMediaQueryFromTheme('xl')} {
    width: 683px;
    .lead-image-container {
      display: inline;
    }
  }
`;

export const StyledMainDivider = styled(Block)`
  ${getMediaQueryFromTheme('md')} {
    width: 719px;
  }
  ${getMediaQueryFromTheme('lg')} {
    width: 642px;
  }
  ${getMediaQueryFromTheme('xl')} {
    width: 840px;
  }
`;

export const StyledAdContainer = styled(Block)`
  ${getMediaQueryFromTheme('md')} {
    display: none;
  }
  ${getMediaQueryFromTheme('lg')} {
    display: inline;
    position: sticky;
    ${getSpacingCssFromTheme(
      (space: string) => ({ top: `${space}` }),
      'space100'
    )};
  }
`;

export const StyledAdBlock = styled(Block)`
  height: 250px;
  background: #ff5858;
  margin-bottom: 30px;
  ${getMediaQueryFromTheme('md')} {
    margin: 0 0 30px 0;
  }

  ${getMediaQueryFromTheme('lg')} {
    width: 300px;
    height: 600px;
    background: #ff5858;
  }
`;

export const StyledDateText = styled(TextBlock)`
  white-space: nowrap;
  width: 109px;
`;

export const AdBlockWrapperMedium = styled(Block)`
  margin-left: -170px;
  margin-right: -30px;
`;

export const StyledPagination = styled(Pagination)`
  ul li button {
    background-color: inherit;
  }
`;

export const StyledPaginationButton = styled(PaginationButton)`
  color: inherit;
  border-radius: 8px;
  &[aria-current='page'] {
    background-color: #e4e4e4;
  }
`;

export const LoadingBlock = styled(Block)<{
  height: string | MQ<string>;
  width?: string;
}>`
  ${getColorCssFromTheme('background-color', 'neutral010')};
  ${({ width }) => width && `width: ${width || '100%'};`} ${({ width }) =>
    !width && getMediaQueryFromTheme('md')} {
    width: 407px;
  }
  ${({ width }) => !width && getMediaQueryFromTheme('lg')} {
    width: 331px;
  }
  ${({ width }) => !width && getMediaQueryFromTheme('xl')} {
    width: 470px;
  }

  ${({ height }) =>
    getSizingCssFromTheme((size: string) => ({ height: `${size}` }), height)};
`;
