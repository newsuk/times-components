import {
  styled,
  Block,
  getColorCssFromTheme,
  CardComposable,
  getMediaQueryFromTheme
} from 'newskit';
import { NewsKitPuzzlePlaceholder } from './assets';

export const Wrap = styled(Block)`
  position: absolute;
`;

export const PuzzleCardComposable = styled(CardComposable)`
  display: flex;
  flex-direction: column;
`;

export const PuzzleCardImgWrapper = styled(Block)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  min-height: 50%;

  ${getMediaQueryFromTheme('sm')} {
    min-height: 51%;
  }
  ${getMediaQueryFromTheme('md')} {
    min-height: 55%;
  }
  ${getMediaQueryFromTheme('lg')} {
    min-height: 68%;
  }
  ${getMediaQueryFromTheme('xl')} {
    min-height: 74%;
  }

  img {
    aspect-ratio: 3/2;
  }
`;

export const StyledNewsKitPuzzlePlaceholder = styled(NewsKitPuzzlePlaceholder)`
  ${getColorCssFromTheme('color', 'puzzles010')};
`;
