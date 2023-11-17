import { getMediaQueryFromTheme, GridLayout, styled } from 'newskit';

export const ArticleGrid = styled(GridLayout)`
  hr[aria-label='article-divider-horizontal'] {
    display: none;
  }
  hr[aria-label='article-divider-vertical'] {
    display: block;
  }

  ${getMediaQueryFromTheme('lg')} {
    hr[aria-label='article-divider-vertical'] {
      display: none;
    }
    hr[aria-label='article-divider-horizontal'] {
      display: block;
    }
  }
  ${getMediaQueryFromTheme('lg', 'xl')} {
    .article-image {
      display: none;
    }
  }
  ${getMediaQueryFromTheme('xl')} {
    & > div:nth-of-type(2) hr[aria-label='article-divider-horizontal'] {
      display: none;
    }
  }
`;
