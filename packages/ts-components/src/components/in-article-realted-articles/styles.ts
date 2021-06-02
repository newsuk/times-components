import styled from 'styled-components';
import { breakpoints, fonts, colours } from '@times-components/styleguide';

export const Container = styled.div<{ sectionColour: string }>`
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px auto;
  padding: 0;
  color: ${colours.functional.brandColour};
  background-color: ${colours.functional.backgroundPrimary};
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};

  a {
    text-decoration: none;
  }
  .heading {
    font-family: ${fonts.headline};
    font-size: 28px;
    margin-top: 20px;
    padding: 16px;
    display: none;
  }
  nav {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: ${breakpoints.medium}px) {
    .heading {
      display: block;
    }
    nav {
      flex-direction: row;
    }
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const RelatedArticleContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  padding: 0 16px;
  margin: 16px 0;

  border-bottom: 1px solid ${colours.functional.keyline};

  @media (min-width: ${breakpoints.medium}px) {
    border-right: 1px solid ${colours.functional.keyline};
    border-bottom: none;
  }

  &:last-child {
    border-right: none;
    border-bottom: none;
  }

  .headline {
    font-family: ${fonts.headline};
    font-size: 20px;
    line-height: 20px;
    margin-top: 4px;
  }
  .label {
    font-family: ${fonts.supporting};
    font-size: 12px;
    line-height: 18px;
    color: ${colours.functional.action};
`;

export const RelatedArticlesImageContainer = styled.div`
  padding-bottom: 12px;
  width: 180px;

  @media (min-width: ${breakpoints.medium}px) {
    width: 100%;
  }
`;
