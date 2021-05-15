import styled from 'styled-components';
import { breakpoints } from '@times-components/styleguide';

import { calculateSlotWidth } from '../../../utils/getArticleStyles';

import { SlotContainer as SlotContainerBase } from '../shared-styles';

export const SlotContainer = styled(SlotContainerBase)`
  width: ${calculateSlotWidth(50, 2)};

  &:nth-of-type(odd) {
    padding-right: 12px;

    :before {
      display: block;
      bottom: 12px;
    }
  }

  &:nth-of-type(even) {
    padding-left: 12px;
  }

  @media (min-width: ${breakpoints.medium}px) {
    width: ${calculateSlotWidth(20, 5)};
    margin-bottom: 24px;
    padding: 0 12px 24px 12px;

    :before {
      display: block;
      bottom: 24px !important;
    }

    &:nth-of-type(5n + 1) {
      padding-left: 0;
    }

    &:nth-of-type(5n) {
      padding-right: 0;

      &:before {
        display: none;
      }
    }
  }
`;
