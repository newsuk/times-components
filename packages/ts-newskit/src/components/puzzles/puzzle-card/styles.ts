import { styled, Block, getColorCssFromTheme, CardComposable } from 'newskit';
import { NewsKitPuzzlePlaceholder } from './assets';

export const Wrap = styled(Block)`
  position: absolute;
  top: 39%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const PuzzleCardComposable = styled(CardComposable)`
  display: flex;
  flex-direction: column;
`;

export const PuzzleCardImgWrapper = styled(Block)`
  position: relative;
  display: flex;
  height: 0;
  padding-bottom: 66.6%;

  img {
    aspect-ratio: 3/2;
  }
`;

export const StyledNewsKitPuzzlePlaceholder = styled(NewsKitPuzzlePlaceholder)`
  ${getColorCssFromTheme('color', 'sectionBrand010')};
`;
