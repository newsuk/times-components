import styled from 'styled-components';
import { breakpoints } from '@times-components/ts-styleguide';

import { calculateSlotWidth } from '../../../utils/getArticleStyles';

import { SlotContainer as SlotContainerBase } from '../shared-styles';

export const SlotContainer = styled(SlotContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    width: ${calculateSlotWidth(33.33, 3)};
    margin-bottom: 24px;
    padding: 0 12px 24px 12px;

    :before {
      display: block;
      bottom: 24px;
    }

    :after {
      display: block;
    }

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;

      &:before {
        display: none;
      }
    }
  }
`;
