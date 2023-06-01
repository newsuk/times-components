import {
  Stack,
  GridLayout,
  Button,
  styled,
  getColorCssFromTheme,
  ButtonProps,
  StackProps,
  LinkStandalone,
  LinkProps
} from 'newskit';
import SudokuIconD4 from '../../../assets/SudokuIconD4';
import SudokuIconD2 from '../../../assets/SudokuIconD2';
import SudokuIconA4 from '../../../assets/SudokuIconA4';
import { NewsKitWaveBg } from '../../../assets';

export const BreakoutSectionContainer = styled(Stack)<StackProps>`
  position: relative;
  ${getColorCssFromTheme('backgroundColor', 'puzzles040')};
`;

export const BreakoutSectionGridLayout = styled(GridLayout)`
  position: relative;
`;

export const BreakoutSectionBtn = styled(Button)<ButtonProps>`
  position: relative;
  z-index: 2;
`;

export const BreakoutSectionLink = styled(LinkStandalone)<LinkProps>`
  position: relative;
  z-index: 2;
  color: black;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover,
  &:link,
  &:visited,
  &:active {
    text-decoration: none !important;
    color: black !important;
  }
`;

export const StyledSudokuIconD4 = styled(SudokuIconD4)`
  position: absolute;
  bottom: -20px;
`;

export const StyledSudokuIconD2 = styled(SudokuIconD2)`
  position: absolute;
  top: -39px;
  left: -4px;
`;

export const StyledSudokuIconA4 = styled(SudokuIconA4)`
  position: absolute;
  top: -44px;
  right: -2px;
`;

export const StyledNewskitWaveBg = styled(NewsKitWaveBg)`
  ${getColorCssFromTheme('color', 'puzzles040')};
`;
