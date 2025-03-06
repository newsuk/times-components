import styled from 'styled-components';
import { breakpoints } from '@times-components/ts-styleguide';

import { calculateSlotWidth } from '../../../utils/getArticleStyles';

import {
  SliceContainer as SliceContainerBase,
  SlotContainer as SlotContainerBase
} from '../shared-styles';

export const SliceContainer = styled(SliceContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    max-width: none;
    padding: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const SlotContainer = styled(SlotContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    width: ${calculateSlotWidth(50, 2)};
    margin-bottom: 24px;
    padding-bottom: 24px;

    &:first-of-type {
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
`;
