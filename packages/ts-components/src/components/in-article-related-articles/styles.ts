import styled from 'styled-components';
import { breakpoints, fonts, colours } from '@times-components/styleguide';

export const Container = styled.div<{ sectionColour: string }>`
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px auto;
  padding: 16px 0;
  color: ${colours.functional.brandColour};
  background-color: ${colours.functional.backgroundPrimary};
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};
  clear: both;

  a {
    text-decoration: none;
  }
  .heading {
    font-family: ${fonts.headline};
    font-size: 24px;
    padding: 0 16px 16px 16px;
  }
  nav {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: ${breakpoints.medium}px) {
    padding: 20px 0;

    .heading {
      font-size: 28px;
      padding: 0 16px 20px 16px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  padding: 0 16px 16px 16px;
  margin-bottom: 16px;

  border-bottom: 1px solid ${colours.functional.keyline};

  @media (min-width: ${breakpoints.medium}px) {
    border-right: 1px solid ${colours.functional.keyline};
    border-bottom: none;
    padding: 0 16px;
    margin-bottom: 0;
  }

  &:last-child {
    border-right: none;
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  h3 {
    font-family: ${fonts.headline};
    font-size: 20px;
    line-height: 20px;

    margin: 0;
    color: ${colours.functional.brandColour};
    font-weight: 400;

    :hover {
      color: ${colours.functional.action};
    }
  }
`;

export const RelatedArticlesImageContainer = styled.div`
  width: 180px;
  margin-bottom: 8px;

  @media (min-width: ${breakpoints.medium}px) {
    width: 100%;
  }
`;
export const SectionLabel = styled.div<{ sectionColour: string }>`
  color: ${({ sectionColour }) => sectionColour};
  font-family: ${fonts.supporting};
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 4px;

  letter-spacing: 0.1em;
  text-transform: uppercase;
`;
