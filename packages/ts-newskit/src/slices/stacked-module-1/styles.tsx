import { GridLayout, getMediaQueryFromTheme, styled } from 'newskit';

export const ArticleGrid = styled(GridLayout)<{
  hideImage?: boolean;
}>`
  
    ${getMediaQueryFromTheme('xs', 'md')} {
      hr[aria-label='stacked-article-divider-vertical'] {
        display: none;
      }

      picture {
        display: none;
      }
      
      & > div:nth-of-type(1) picture {
        display: block;
      }

      & > div:nth-of-type(1) > div:nth-of-type(1) {
        margin-bottom: 16px;
      }

      div[aria-label='article-tile-info']{
        margin-block-start: 0;
      }
    }

    ${getMediaQueryFromTheme('md')} {

      picture {
        display: ${({ hideImage }) => (hideImage ? 'none' : 'block')};
      }

      div[aria-label='article-tile-info']{
        margin-top: ${({ hideImage }) => hideImage && '0'};
      }

      hr[aria-label='article-divider-horizontal'] {
        display: none;
      }
    }

  }
`;
