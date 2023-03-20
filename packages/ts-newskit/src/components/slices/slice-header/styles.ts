import { styled, Block, getMediaQueryFromTheme, TextBlock } from 'newskit';

export const StyledBlock = styled(Block)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin: 0 21px 0 20px;
  border-top: 1px dashed #666666;

  ${getMediaQueryFromTheme('md')} {
    margin: 0 24px 0 23px;
  }

  ${getMediaQueryFromTheme('lg')} {
    height: 80px;
    margin: 0 24px 0 23px;
  }

  ${getMediaQueryFromTheme('xl')} {
    margin: 0 83px 0 80px;
  }
`;

export const StyledTextBlock = styled(TextBlock)`
  color: ${({ color }) => color};
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
