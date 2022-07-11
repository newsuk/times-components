import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';

import { DisplaySchema } from '../../../types/styles';
import { isCentered } from '../../../utils/getArticleStyles';

const getWidth = (breakpoint: string, schema?: DisplaySchema) =>
  isCentered(breakpoint, schema)
    ? breakpoint === 'sm' || breakpoint === 'md'
      ? '90%'
      : '80%'
    : '100%';

const getTextAlign = (breakpoint: string, schema?: DisplaySchema) =>
  isCentered(breakpoint, schema) ? 'center' : 'left';

export const Strapline = styled.p<{ schema?: DisplaySchema }>`
  width: ${({ schema }) => getWidth('sm', schema)};
  margin: 4px auto 0 auto;
  color: ${colours.functional.secondary};
  font-size: 14px;
  line-height: 20px;
  text-align: ${({ schema }) => getTextAlign('sm', schema)};
  font-family: ${fonts.body};

  @media (min-width: ${breakpoints.medium}px) {
    width: ${({ schema }) => getWidth('md', schema)};
    text-align: ${({ schema }) => getTextAlign('md', schema)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ schema }) => getWidth('lg', schema)};
    text-align: ${({ schema }) => getTextAlign('lg', schema)};
  }

  @media (min-width: ${breakpoints.huge}px) {
    width: ${({ schema }) => getWidth('xlg', schema)};
    text-align: ${({ schema }) => getTextAlign('xlg', schema)};
  }
`;

export const TimeSince = styled.p`
  margin: 8px 0 0 0;
  color: ${colours.functional.secondary};
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1px;
  font-family: ${fonts.supporting};
  text-transform: uppercase;
`;

export const Link = styled.div`
  margin-top: 8px;

  a {
    color: #006699;
    font-size: 13px;
    line-height: 13px;
    letter-spacing: 0px;
    font-family: ${fonts.supporting};
    font-weight: 500;
    text-decoration: none;

    &:after {
      display: inline-block;
      content: '\\E003';
      font-size: 10px;
      font-family: iconfont;
      padding: 0 0 1px 6px;
      vertical-align: middle;
    }
  }
`;
