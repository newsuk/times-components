import {
  GridLayout,
  getMediaQueryFromTheme,
  getSpacingCssFromTheme,
  styled,
} from 'newskit';

export const ArticleGrid = styled(GridLayout)<{
  hideImageOnDesktop?: boolean;
}>`
  
    ${getMediaQueryFromTheme('xs', 'md')} {
      hr[aria-label='stacked-article-divider-vertical'] {
        display: none;
      }

      .article-image {
        display: none;
      }

      [aria-label='article-lead-image'] {
        display: block;
      }

      .article-image {
        ${getSpacingCssFromTheme('margin-block-end', 'space040')}
      }

      div.article-info {
        ${getSpacingCssFromTheme('margin-block-start', 'space000')}
      }
    }

    ${getMediaQueryFromTheme('md')} {

      hr[aria-label='article-divider-horizontal'] {
        display: none;
      }

     .article-image {
        display: ${({ hideImageOnDesktop }) =>
          hideImageOnDesktop ? 'none' : 'block'};
      }

      div.article-info {
        ${({ hideImageOnDesktop }) => hideImageOnDesktop && 'margin-top: 0'};
      }
    }

  }
`;
