import { styled, Stack, TextBlock, getMediaQueryFromTheme } from 'newskit';

export const StyledBlock = styled(Stack)`
  height: 60px;
  border-top: 1px dashed #666666;
  ${getMediaQueryFromTheme('lg')} {
    height: 80px;
  }
`;

export const StyledTextBlock = styled(TextBlock)<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

export const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`;
