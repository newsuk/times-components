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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const PuzzleCardComposable = styled(CardComposable)`
  display: flex;
  flex-direction: column;
`;

export const PuzzleCardImgWrapper = styled(Block)<{ bgColor?: string }>`
  position: relative;
  display: flex;
  background: ${props => props.bgColor};
  height: 102px;

  ${getMediaQueryFromTheme('md')} {
    height: 144px;
  }
  ${getMediaQueryFromTheme('lg')} {
    height: 193px;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    border-radius: 0;
  }
`;

export const StyledNewsKitPuzzlePlaceholder = styled(NewsKitPuzzlePlaceholder)`
  ${getColorCssFromTheme('color', 'sectionBrand010')};
`;
