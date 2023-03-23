import {
  styled,
  getColorCssFromTheme
} from 'newskit';

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

export const ArticleListFooter = styled.div`
  text-align: left;
`;
