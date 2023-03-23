import { styled, getColorCssFromTheme, Block } from 'newskit';

import { fontsWithFallback } from '@times-components/ts-styleguide';

export const ArticleList = styled.div`
  & > a {
    text-decoration: none;
    ${getColorCssFromTheme('color', 'inkSubtle')};

    &:hover {
      text-decoration: none;
      ${getColorCssFromTheme('color', 'inkSubtle')};
    }

    &:hover:not([disabled]) {
      text-decoration: none;
      ${getColorCssFromTheme('color', 'inkSubtle')};
    }
  }
  text-align: left;
`;

export const ArticleListFooter = styled(Block)`
  text-align: left;
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

export const TimeToRead = styled.span`
  ${getColorCssFromTheme('color', 'inkSubtle')};
`;
