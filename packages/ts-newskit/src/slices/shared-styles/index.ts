import {
  Divider,
  getMediaQueryFromTheme,
  getSpacingCssFromTheme,
  styled,
  Stack,
  Block,
  Scroll,
} from 'newskit';
import { CustomStackLayout } from '../shared';

const setBlockMargin = (space: string) => ({ marginBlockStart: `-${space}` });
export const BlockNoTopMargin = styled(Block)`
  ${getSpacingCssFromTheme(setBlockMargin, 'space040')};
`;

export const LeadStoryContainer = styled(CustomStackLayout)<{
  className?: string;
}>`
  ${getMediaQueryFromTheme('xs', 'lg')} {
    .article-container hr[aria-label='article-divider-horizontal'] {
      display: none;
    }
  }

  ${getMediaQueryFromTheme('lg', 'xl')} {
    .article-container .article-image {
      display: none;
    }
    .composed-article-card-0 .article-image {
      display: ${({ className }) =>
        className === 'lead-story-3-container' ? 'none' : 'grid'};
    }
  }

  ${getMediaQueryFromTheme('md')} {
    .lead-article .lead-image-container {
      display: none;
    }
  }
  ${getMediaQueryFromTheme('md', 'lg')} {
    .bottom-article-stack .article-image {
      display: none;
    }
  }
`;

const setDividerPositionLeft = (space: string) => ({ left: `-${space}` });
const setDividerPositionRight = (space: string) => ({ right: `-${space}` });
export const LeadStoryDivider = styled(Divider)<{ position: string }>`
  position: absolute;
  top: 0;
  ${({ position }) =>
    getSpacingCssFromTheme(
      position === 'left' ? setDividerPositionLeft : setDividerPositionRight,
      'space040',
    )};

  ${getMediaQueryFromTheme('xs', 'lg')} {
    ${({ position }) => position !== 'left' && 'display: none'};
  }
`;

export const ArticleDivider = styled(Divider)`
  position: absolute;
  top: 0;
`;

export const AvatarDivider = styled(Divider)`
  ${getMediaQueryFromTheme('md')} {
    height: 100%;
  }
`;

export const StyledDivider = styled(Divider)`
  height: auto;
`;

export const ArticleDividerXL = styled(Divider)`
  display: none;
  ${getMediaQueryFromTheme('lg')} {
    display: block;
    position: absolute;
    height: 100%;
    left: 50%;
    top: 0;
  }
`;

export const StackItem = styled(Stack)<{
  $width?: { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
}>`
  margin: 0;
  position: relative;
  width: ${({ $width }) => ($width && $width.xs) || '100%'};

  ${getMediaQueryFromTheme('sm')} {
    ${({ $width }) => $width && $width.sm && `max-width: ${$width.sm};`}
  ${getMediaQueryFromTheme('md')} {
    ${({ $width }) => $width && $width.md && `max-width: ${$width.md};`}
  ${getMediaQueryFromTheme('lg')} {
    ${({ $width }) => $width && $width.lg && `max-width: ${$width.lg};`}
  ${getMediaQueryFromTheme('xl')} {
    ${({ $width }) => $width && $width.xl && `max-width: ${$width.xl};`}
`;

export const BlockItem = styled(Block)<{
  $width?: { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
}>`
  width: 100%;
  margin-inline: auto;

  ${getMediaQueryFromTheme('sm')} {
    ${({ $width }) => $width && $width.sm && `max-width: ${$width.sm};`}
  ${getMediaQueryFromTheme('md')} {
    ${({ $width }) => $width && $width.md && `max-width: ${$width.md};`}
  ${getMediaQueryFromTheme('lg')} {
    ${({ $width }) => $width && $width.lg && `max-width: ${$width.lg};`}
  ${getMediaQueryFromTheme('xl')} {
    ${({ $width }) => $width && $width.xl && `max-width: ${$width.xl};`}
`;

export const RelativeBlockItem = styled(Block)`
  position: relative;
`;

export const ScrollContainer = styled(Scroll)`
  overflow-y: hidden;
`;
