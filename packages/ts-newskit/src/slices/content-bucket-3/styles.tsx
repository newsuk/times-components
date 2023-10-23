import { Block, getMediaQueryFromTheme, styled } from 'newskit';

export const LeadArticles = styled(Block)`
  ${getMediaQueryFromTheme('md')} {
    hr[aria-label='article-divider-horizontal'] {
      display: none;
    }
  }
`;
