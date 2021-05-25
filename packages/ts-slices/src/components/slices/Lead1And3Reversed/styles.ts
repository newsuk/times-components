import styled from 'styled-components';
import { breakpoints } from '@times-components/styleguide';

import { calculateSlotWidth } from '../../../utils/getArticleStyles';

import { SlotContainer as SlotContainerBase } from '../shared-styles';

export const StackedColumn = styled(SlotContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    width: ${calculateSlotWidth(50, 2)};
    margin-bottom: 24px;
    padding-right: 12px;
    padding-bottom: 24px;

    :before {
      display: block;
      bottom: 24px;
    }
  }
`;

export const SideBySideColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const SlotContainerLead = styled(SlotContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    width: ${calculateSlotWidth(50, 2)};
    margin-bottom: 24px;
    padding-bottom: 24px;
    padding-left: 12px;
  }
`;

export const SlotContainer = styled(SlotContainerBase)`
  width: ${calculateSlotWidth(50, 2)};

  &:first-of-type {
    padding-right: 12px;

    :before {
      display: block;
      bottom: 12px;
    }
  }

  &:last-of-type {
    padding-left: 12px;
  }
`;
