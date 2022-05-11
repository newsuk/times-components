import get from 'lodash.get';

import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';

import { DisplaySchema } from '../../types/styles';
import { isSideBySide, isCentered } from '../../utils/getArticleStyles';

const getDirection = (breakpoint: string, schema?: DisplaySchema) =>
  isSideBySide(breakpoint, schema) ? 'row' : 'column';

const getWidth = (breakpoint: string, schema?: DisplaySchema) =>
  isSideBySide(breakpoint, schema)
    ? get(get(schema, breakpoint), 'sideBySideWidth', '50%')
    : '100%';

const getPadding = (breakpoint: string, schema?: DisplaySchema) =>
  isSideBySide(breakpoint, schema)
    ? `${get(get(schema, breakpoint), 'sideBySidePadding', 8)}px`
    : 0;

const getFlexPosition = (breakpoint: string, schema?: DisplaySchema) =>
  isCentered(breakpoint, schema) ? 'center' : 'flex-start';

const getMargin = (breakpoint: string, schema?: DisplaySchema) =>
  isCentered(breakpoint, schema) && !isSideBySide(breakpoint, schema)
    ? '16px 0 24px 0'
    : 0;

const getBackgroundColor = (breakpoint: string, schema?: DisplaySchema) =>
  get(get(schema, breakpoint), 'backgroundColor', 'transparent');

export const ArticleContainer = styled.article<{ schema?: DisplaySchema }>`
  display: flex;
  flex-direction: ${({ schema }) => getDirection('sm', schema)};
  background-color: ${({ schema }) => getBackgroundColor('sm', schema)};

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: ${({ schema }) => getDirection('md', schema)};
    background-color: ${({ schema }) => getBackgroundColor('md', schema)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    flex-direction: ${({ schema }) => getDirection('lg', schema)};
    background-color: ${({ schema }) => getBackgroundColor('lg', schema)};
  }

  @media (min-width: ${breakpoints.huge}px) {
    flex-direction: ${({ schema }) => getDirection('xlg', schema)};
    background-color: ${({ schema }) => getBackgroundColor('xlg', schema)};
  }
`;

export const SideBySideColumn = styled.div<{ schema?: DisplaySchema }>`
  width: 100%;

  &:first-of-type {
    flex-shrink: 0;
    width: ${({ schema }) => getWidth('sm', schema)};
    padding-right: ${({ schema }) => getPadding('sm', schema)};
  }

  &:last-of-type {
    display: flex;
    flex-direction: column;
    justify-content: ${({ schema }) => getFlexPosition('sm', schema)};
    align-items: ${({ schema }) => getFlexPosition('sm', schema)};
    margin: ${({ schema }) => getMargin('sm', schema)};
    padding-left: ${({ schema }) => getPadding('sm', schema)};
  }

  @media (min-width: ${breakpoints.medium}px) {
    &:first-of-type {
      width: ${({ schema }) => getWidth('md', schema)};
      padding-right: ${({ schema }) => getPadding('md', schema)};
    }

    &:last-of-type {
      justify-content: ${({ schema }) => getFlexPosition('md', schema)};
      align-items: ${({ schema }) => getFlexPosition('md', schema)};
      margin: ${({ schema }) => getMargin('md', schema)};
      padding-left: ${({ schema }) => getPadding('md', schema)};
    }
  }

  @media (min-width: ${breakpoints.wide}px) {
    &:first-of-type {
      width: ${({ schema }) => getWidth('lg', schema)};
      padding-right: ${({ schema }) => getPadding('lg', schema)};
    }

    &:last-of-type {
      justify-content: ${({ schema }) => getFlexPosition('lg', schema)};
      align-items: ${({ schema }) => getFlexPosition('lg', schema)};
      margin: ${({ schema }) => getMargin('lg', schema)};
      padding-left: ${({ schema }) => getPadding('lg', schema)};
    }
  }

  @media (min-width: ${breakpoints.huge}px) {
    &:first-of-type {
      width: ${({ schema }) => getWidth('xlg', schema)};
      padding-right: ${({ schema }) => getPadding('xlg', schema)};
    }

    &:last-of-type {
      justify-content: ${({ schema }) => getFlexPosition('xlg', schema)};
      align-items: ${({ schema }) => getFlexPosition('xlg', schema)};
      margin: ${({ schema }) => getMargin('xlg', schema)};
      padding-left: ${({ schema }) => getPadding('xlg', schema)};
    }
  }
`;

export const Label = styled.p`
  margin: 0 0 4px 0;
  color: ${colours.functional.secondary};
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1px;
  font-family: ${fonts.supporting};
  text-transform: uppercase;
`;
