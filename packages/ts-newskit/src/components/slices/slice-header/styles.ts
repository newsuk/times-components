import { styled, Stack, getMediaQueryFromTheme } from 'newskit';

export const StyledStack = styled(Stack)`
  height: 60px;
  border-top: 1px dashed #666666;
  ${getMediaQueryFromTheme('lg')} {
    height: 80px;
  }
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
