import {
  GridLayout,
  Stack,
  StackProps,
  styled,
  getColorCssFromTheme,
  getStylePresetFromTheme,
} from 'newskit';
import { NewsKitWaveBg } from '../../../assets';

export const PersonalStatisticsContainer = styled(Stack)<StackProps>`
  ${getColorCssFromTheme('backgroundColor', 'sectionBrand040')};
`;

export const PersonalStatisticsCard = styled(GridLayout)`
  ${getStylePresetFromTheme('puzzlesShadowBtn')};
`;

export const StyledNewskitWaveBg = styled(NewsKitWaveBg)`
  ${getColorCssFromTheme('color', 'sectionBrand040')};
`;
