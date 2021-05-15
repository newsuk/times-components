import get from 'lodash.get';

import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

import { DisplaySchema } from '../../../types/styles';
import { isCentered } from '../../../utils/getArticleStyles';

const getFontSize = (breakpoint: string, schema?: DisplaySchema) =>
  get(get(schema, breakpoint), 'headlineFontSize', 10);

const getWidth = (breakpoint: string, schema?: DisplaySchema) =>
  isCentered(breakpoint, schema)
    ? breakpoint === 'sm' || breakpoint === 'md'
      ? '90%'
      : '80%'
    : '100%';

const getTextAlign = (breakpoint: string, schema?: DisplaySchema) =>
  isCentered(breakpoint, schema) ? 'center' : 'left';

export const HeadlineContainer = styled.div<{ schema?: DisplaySchema }>`
  width: ${({ schema }) => getWidth('sm', schema)};
  margin: 0 auto;

  @media (min-width: ${breakpoints.medium}px) {
    width: ${({ schema }) => getWidth('md', schema)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ schema }) => getWidth('lg', schema)};
  }

  @media (min-width: ${breakpoints.huge}px) {
    width: ${({ schema }) => getWidth('xlg', schema)};
  }

  a {
    text-decoration: none;

    h3 {
      margin: 0;
      color: ${colours.functional.brandColour};
      font-size: ${({ schema }) => getFontSize('sm', schema)}px;
      line-height: ${({ schema }) => getFontSize('sm', schema)}px;
      font-family: ${fonts.headline};
      font-weight: normal;
      text-align: ${({ schema }) => getTextAlign('sm', schema)};

      @media (min-width: ${breakpoints.medium}px) {
        font-size: ${({ schema }) => getFontSize('md', schema)}px;
        line-height: ${({ schema }) => getFontSize('md', schema)}px;
        text-align: ${({ schema }) => getTextAlign('md', schema)};
      }

      @media (min-width: ${breakpoints.wide}px) {
        font-size: ${({ schema }) => getFontSize('lg', schema)}px;
        line-height: ${({ schema }) => getFontSize('lg', schema)}px;
        text-align: ${({ schema }) => getTextAlign('lg', schema)};
      }

      @media (min-width: ${breakpoints.huge}px) {
        font-size: ${({ schema }) => getFontSize('xlg', schema)}px;
        line-height: ${({ schema }) => getFontSize('xlg', schema)}px;
        text-align: ${({ schema }) => getTextAlign('xlg', schema)};
      }
    }

    &:hover {
      h3 {
        color: #006699;
      }
    }
  }
`;
