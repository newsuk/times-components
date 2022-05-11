import styled from 'styled-components';
import { breakpoints } from '@times-components/ts-styleguide';

import { SliceStyle } from '../../types/styles';

export const SliceContainer = styled.div<{ styles?: SliceStyle }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  padding: ${({ styles }) => (styles && styles.removePadding ? 0 : '0 16px')};

  @media (min-width: ${breakpoints.small}px) {
    max-width: 520px;
  }

  @media (min-width: ${breakpoints.medium}px) {
    max-width: 860px;
    padding: ${({ styles }) => (styles && styles.removePadding ? 0 : '0 20px')};
  }

  @media (min-width: ${breakpoints.wide}px) {
    max-width: 1024px;
  }

  @media (min-width: ${breakpoints.huge}px) {
    max-width: 1180px;
  }
`;

export const SlotContainer = styled.div<{
  styles?: SliceStyle;
  collapse?: boolean;
}>`
  position: relative;
  width: 100%;
  margin-bottom: ${({ collapse }) => (collapse ? 0 : '12px')};
  padding-bottom: ${({ collapse }) => (collapse ? 0 : '12px')};
  box-sizing: content-box;

  :before {
    content: '';
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background-color: ${({ styles }) =>
      styles && styles.lineColor ? styles.lineColor : '#dbdbdb'};
  }

  :after {
    content: '';
    display: ${({ collapse }) => (collapse ? 'none' : 'block')};
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    background-color: ${({ styles }) =>
      styles && styles.lineColor ? styles.lineColor : '#dbdbdb'};
  }
`;
