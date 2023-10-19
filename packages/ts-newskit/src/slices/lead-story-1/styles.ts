import { styled, getSpacingCssFromTheme, Block, getMediaQueryFromTheme } from 'newskit';
import { CustomStackLayout } from '../shared';

const setBlockMargin = (space: string) => ({ marginBlockStart: `-${space}` });
export const BlockNoTopMargin = styled(Block)`
  ${getSpacingCssFromTheme(setBlockMargin, 'space040')};
`;

export const LeadStoryContainer = styled(CustomStackLayout)`
  ${getMediaQueryFromTheme('md')} {
    .lead-article .lead-image-container {
      display: none;
    }
  }
  ${getMediaQueryFromTheme('md', 'lg')} {
    .bottom-article-stack .article-image {
      display: none;
    }
    .bottom-article-stack .article-info {
      margin-block-start: 0;
    }
  }
`;
