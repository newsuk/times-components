import { styled, getColorCssFromTheme, Block } from 'newskit';
import { fontsWithFallback } from '@times-components/ts-styleguide';

export const ArticleList = styled(Block)`
  margin: 0 15px;
`;

export const ArticleListFooter = styled(Block)`
  font-family: ${fontsWithFallback.supporting};
  font-size: 12px;
  line-height: 14px;
  margin-top: 10px;

  span {
    border-left: 1px solid #ccc;
    padding: 0 10px;
    font-weight: 400;

    &:first-child {
      border-left: none;
      padding-left: 0;
      font-weight: 700;
    }
  }
`;

export const ArticleListType = styled.span`
  color: ${({ color }) => color};
`;

export const TimeToRead = styled.span`
  ${getColorCssFromTheme('color', 'inkSubtle')};
`;
