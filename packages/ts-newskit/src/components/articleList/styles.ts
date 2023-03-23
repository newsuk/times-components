import {
  styled
} from 'newskit';

export const ArticleList = styled.div`
  & > a {
    text-decoration: none;

    &:hover:not([disabled]) {
      text-decoration: none;
    }
  }
  text-align: center;
`;

export const ArticleListFooter = styled.div`
  text-align: center;
`;
