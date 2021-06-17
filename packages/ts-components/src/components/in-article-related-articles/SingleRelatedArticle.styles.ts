import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const SingleRelatedArticleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: ${colours.functional.brandColour};

  section {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    min-width: 100%;
    padding: 0 16px;

    @media (min-width: ${breakpoints.medium}px) {
      min-width: 300px;
      padding: 0 16px 0 0;
    }

    a {
      text-decoration: none;
    }

    h3 {
      color: ${colours.functional.brandColour};
      font-family: ${fonts.headline};
      font-size: 20px;
      font-weight: 400;
      line-height: 20px;
      margin: 5px 0;

      :hover {
        color: ${colours.functional.action};
      }
    }
    .summary {
      font-family: ${fonts.body};
      color: ${colours.functional.secondary};
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 10px;
    }

    .publishedTime {
      font-family: ${fonts.supporting};
      color: ${colours.functional.secondary};
      font-size: 13px;
      margin-bottom: 5px;
    }
    .byline {
      font-family: ${fonts.supporting};
      color: ${colours.functional.primary};
      font-size: 13px;
      margin-bottom: 5px;
    }
  }
`;

export const SingleRelatedArticlesImageContainer = styled.div`
  flex: 1 1 0;
  min-width: auto;
  padding: 0 16px;
  margin-bottom: 8px;
`;
