import styled from 'styled-components';
import { breakpoints } from '@times-components/ts-styleguide';

import { calculateSlotWidth } from '../../../utils/getArticleStyles';

import {
  SliceContainer as SliceContainerBase,
  SlotContainer as SlotContainerBase
} from '../shared-styles';

export const SliceContainer = styled(SliceContainerBase)`
  @media (min-width: ${breakpoints.wide}px) {
    flex-wrap: nowrap;
  }
`;

export const SlotContainerLarge = styled(SlotContainerBase)`
  order: 1;

  @media (min-width: ${breakpoints.medium}px) {
    width: ${calculateSlotWidth(50, 2)};

    &:first-of-type {
      padding-right: 12px;

      :before {
        display: block;
        bottom: 12px;
      }
    }

    &:nth-of-type(3) {
      padding-left: 12px;
    }
  }

  @media (min-width: ${breakpoints.wide}px) {
    flex-shrink: 0;
    width: ${calculateSlotWidth(33.33, 3)};
    margin-bottom: 24px;
    padding-bottom: 24px;

    :before {
      display: block;
      bottom: 24px !important;
    }

    &:nth-of-type(3) {
      padding-right: 12px;
    }
  }
`;

export const SlotContainerSmall = styled(SlotContainerBase)`
  order: 2;

  @media (min-width: ${breakpoints.medium}px) {
    width: ${calculateSlotWidth(50, 2)};
    margin-bottom: 24px;
    padding-bottom: 24px;

    &:nth-of-type(2) {
      padding-right: 12px;

      :before {
        display: block;
        bottom: 24px;
      }
    }

    &:last-of-type {
      padding-left: 12px;
    }
  }

  @media (min-width: ${breakpoints.wide}px) {
    order: 1;

    &:nth-of-type(2) {
      padding-left: 12px;

      :before {
        bottom: 24px;
      }
    }
  }
`;
