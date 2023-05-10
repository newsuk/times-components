import {
  styled,
  TextBlock,
  Block,
  getSizingCssFromTheme,
  getColorCssFromTheme,
  CardLink
} from 'newskit';

export const CardHeadlineLink = styled(CardLink)`
  ${getColorCssFromTheme('color', 'inkContrast')};
  text-decoration: none;

  &&:hover,
  &&:active {
    text-decoration: none;
    ${getColorCssFromTheme('color', 'interactiveLink020')};
  }

  &&:active {
    ${getColorCssFromTheme('color', 'interactiveLink030')};
  }
`;

export const ColouredText = styled(TextBlock)<{ $color?: string }>`
  ${({ $color }) => $color && `color: ${$color};`};
`;

export const ContainerInline = styled(Block)`
  display: inline-block;
  ${getSizingCssFromTheme('height', 'sizing020')};
`;
