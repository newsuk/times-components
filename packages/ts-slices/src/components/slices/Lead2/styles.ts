import styled from 'styled-components';
import { breakpoints } from '@times-components/styleguide';

import { calculateSlotWidth } from '../../../utils/getArticleStyles';

import { SlotContainer as SlotContainerBase } from '../shared-styles';

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
