import { GridLayout, getMediaQueryFromTheme, getSpacingCssFromTheme, styled } from 'newskit';

export const ArticleGrid = styled(GridLayout)<{
  hideImageOnDesktop?: boolean;
}>`
  
    ${getMediaQueryFromTheme('xs', 'md')} {
      hr[aria-label='stacked-article-divider-vertical'] {
        display: none;
      }

      [aria-label='article-image'] {
        display: none;
      }

      [aria-label='article-lead-image'] {
        ${getSpacingCssFromTheme('margin-block-end','space040')}
      }

      div[aria-label='article-tile-info']{
        ${getSpacingCssFromTheme('margin-block-start','space000')}
      }
    }

    ${getMediaQueryFromTheme('md')} {

      hr[aria-label='article-divider-horizontal'] {
        display: none;
      }

      [aria-label='article-image'], [aria-label='article-lead-image'] {
        display: ${({ hideImageOnDesktop }) => (hideImageOnDesktop ? 'none' : 'block')};
      }

      div[aria-label='article-tile-info']{
        margin-top: ${({ hideImageOnDesktop }) => hideImageOnDesktop && '0'};
      }
    }

  }
`;
