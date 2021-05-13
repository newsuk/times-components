import styled from 'styled-components';
import { breakpoints } from '@times-components/styleguide';

export const ArticlePage = styled.div`
  background-color: #f5efeb;
`;

export const ArticleBody = styled.div`
  max-width: 520px;
  margin: 0 auto;
  padding: 20px 0;
  background-color: white;

  @media (min-width: ${breakpoints.medium}px) {
    max-width: 860px;
  }

  @media (min-width: ${breakpoints.wide}px) {
    max-width: 1024px;
  }

  @media (min-width: ${breakpoints.huge}px) {
    max-width: 1180px;
  }
`;

const ArticleColumn = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const Paragraph = styled(ArticleColumn)`
  margin-bottom: 25px;
  padding: 0 10px;
  color: #333;
  line-height: 26px;
  font-size: 17px;
  font-family: TimesDigitalW04-Regular;

  @media (min-width: ${breakpoints.medium}px) {
    padding: 0;
    font-size: 18px;
    line-height: 30px;
  }
`;
