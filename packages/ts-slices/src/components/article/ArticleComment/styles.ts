import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';
import { ArticleContainer as ArticleContainerBase } from '../shared-styles';

export const ArticleContainer = styled(ArticleContainerBase)`
  align-items: center;
`;

export const ImageContainer = styled.div<{ backgroundColor?: string }>`
  max-width: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : 'inherit'};

  @media (min-width: ${breakpoints.huge}px) {
    max-width: 140px;
  }
`;

export const Byline = styled.p<{ color?: string; marginBlockEnd?: string }>`
  margin: 0 0 4px 0;
  color: ${({ color }) => (color ? color : colours.functional.secondary)};
  margin-block-end: ${({ marginBlockEnd }) =>
    marginBlockEnd ? marginBlockEnd : '0px'};

  font-size: 22px;
  line-height: 22px;
  font-family: ${fonts.headlineRegular};

  @media (min-width: ${breakpoints.huge}px) {
    font-size: 24px;
    line-height: 24px;
  }
`;
