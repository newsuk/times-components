// IMPORTANT: This component is in the process of being moved to the main repository.
// Please avoid making any changes to this file for the time being.
// For updates or modifications, refer to the main repository once the move is complete.
// In case of emergencies, please reach out to reader-experience team for further assistance.

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
