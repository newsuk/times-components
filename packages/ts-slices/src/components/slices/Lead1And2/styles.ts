import styled from 'styled-components';
import { breakpoints } from '@times-components/styleguide';

import { calculateSlotWidth } from '../../../utils/getArticleStyles';

import {
  SliceContainer as SliceContainerBase,
  SlotContainer as SlotContainerBase
} from '../shared-styles';

export const SliceContainer = styled(SliceContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    flex-wrap: nowrap;
  }
`;

export const SlotContainerLead = styled(SlotContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    margin-bottom: 24px;
    padding-right: 12px;
    padding-bottom: 24px;

    :before {
      display: block;
      bottom: 24px;
    }
  }
`;

export const StackedColumn = styled(SlotContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    flex-shrink: 0;
    width: ${calculateSlotWidth(33.33, 3)};
    margin-bottom: 24px;
    padding-bottom: 24px;
    padding-left: 12px;
  }
`;
