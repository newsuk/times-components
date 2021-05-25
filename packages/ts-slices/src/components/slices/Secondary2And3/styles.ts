import styled from 'styled-components';
import { breakpoints } from '@times-components/styleguide';

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

export const SlotContainerLead = styled(SlotContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    width: ${calculateSlotWidth(50, 2)};

    &:first-of-type {
      padding-right: 12px;

      :before {
        display: block;
        bottom: 12px;
      }
    }

    &:nth-of-type(2) {
      padding-left: 12px;
    }
  }

  @media (min-width: ${breakpoints.wide}px) {
    margin-bottom: 24px;
    padding-bottom: 24px;

    :before {
      display: block;
      bottom: 24px !important;
    }

    &:nth-of-type(2) {
      padding-right: 12px;
    }
  }
`;

export const StackedColumn = styled(SlotContainerBase)`
  margin-bottom: 0;
  padding-bottom: 0;

  :after {
    display: none;
  }

  @media (min-width: ${breakpoints.medium}px) {
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: ${breakpoints.wide}px) {
    display: block;
    flex-shrink: 0;
    width: ${calculateSlotWidth(33.33, 3)};
    margin-bottom: 24px;
    padding-bottom: 24px;
    padding-left: 12px;

    :after {
      display: block;
    }
  }
`;

export const SlotContainer = styled(SlotContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    width: ${calculateSlotWidth(50, 2)};
    margin-bottom: 24px;
    padding: 0 12px 24px 12px;

    :before {
      display: block;
      bottom: 24px;
    }

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;

      :before {
        display: none;
      }
    }
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 100%;
    margin-bottom: 12px;
    padding: 0 0 12px 0;

    :before {
      display: none;
    }

    &:last-of-type {
      margin-bottom: 0;
      padding-bottom: 0;

      :after {
        display: none;
      }
    }
  }
`;
