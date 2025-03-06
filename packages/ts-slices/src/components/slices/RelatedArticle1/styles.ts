import styled from 'styled-components';
import { breakpoints } from '@times-components/ts-styleguide';

import {
  SliceContainer as SliceContainerBase,
  SlotContainer as SlotContainerBase
} from '../shared-styles';

export const SliceContainer = styled(SliceContainerBase)`
  @media (min-width: ${breakpoints.medium}px) {
    flex-wrap: nowrap;
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
    margin-bottom: 24px;
    padding-right: 0;
    padding-bottom: 24px;
  }
`;
