import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

import { ArticleContainer as ArticleContainerBase } from '../shared-styles';

export const ArticleContainer = styled(ArticleContainerBase)`
  align-items: center;
`;

export const ImageContainer = styled.div`
  max-width: 120px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.huge}px) {
    max-width: 140px;
  }
`;

export const Byline = styled.p`
  margin: 0 0 4px 0;
  color: ${colours.functional.secondary};
  font-size: 22px;
  line-height: 22px;
  font-family: ${fonts.headlineRegular};

  @media (min-width: ${breakpoints.huge}px) {
    font-size: 24px;
    line-height: 24px;
  }
`;
