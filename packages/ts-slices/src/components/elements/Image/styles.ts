import styled from 'styled-components';
import { breakpoints } from '@times-components/ts-styleguide';

import { DisplaySchema } from '../../../types/styles';
import { isSideBySide, isImageHidden } from '../../../utils/getArticleStyles';

const getMargin = (breakpoint: string, schema?: DisplaySchema) =>
  isSideBySide(breakpoint, schema) || isImageHidden(breakpoint, schema)
    ? 0
    : '12px';

const getDisplay = (breakpoint: string, schema?: string[]) =>
  schema && schema.includes(breakpoint) ? 'block' : 'none';

const getImagePadding = (ratio?: string) => {
  switch (ratio) {
    case '16:9':
      return '56.25%';
    case '3:2':
      return '66.66%';
    case '1:1':
      return '100%';

    default:
      return 0;
  }
};

export const ImageContainer = styled.div<{ schema?: DisplaySchema }>`
  margin-bottom: ${({ schema }) => getMargin('sm', schema)};

  @media (min-width: ${breakpoints.medium}px) {
    margin-bottom: ${({ schema }) => getMargin('md', schema)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    margin-bottom: ${({ schema }) => getMargin('lg', schema)};
  }

  @media (min-width: ${breakpoints.huge}px) {
    margin-bottom: ${({ schema }) => getMargin('xlg', schema)};
  }
`;

export const ImageRatio = styled.div<{ ratio: string; schema?: string[] }>`
  position: relative;
  display: ${({ schema }) => getDisplay('sm', schema)};
  overflow: hidden;

  &:after {
    content: '';
    display: block;
    padding-bottom: ${({ ratio }) => getImagePadding(ratio)};
  }

  @media (min-width: ${breakpoints.medium}px) {
    display: ${({ schema }) => getDisplay('md', schema)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    display: ${({ schema }) => getDisplay('lg', schema)};
  }

  @media (min-width: ${breakpoints.huge}px) {
    display: ${({ schema }) => getDisplay('xlg', schema)};
  }
`;
