import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div<{ sectionColour: string }>`
  display: flex;
  flex-direction: column;
  margin: 0 auto 20px auto;
  padding: 16px 0;
  color: ${colours.functional.brandColour};
  background-color: ${colours.functional.backgroundPrimary};
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};

  .heading {
    font-family: ${fonts.headline};
    font-size: 24px;
    padding: 0 16px 16px 16px;
  }

  table {
    border-collapse: collapse;
    th {
      font-weight: normal;
      font-family: ${fonts.supporting};
      background-color: ${colours.functional.backgroundSecondary};
      font-size: 14px;
      line-height: 18px;
      text-align: left;
      padding: 16px 0;
    }

    tbody {
      font-family: ${fonts.headline};
      font-size: 16px;
      line-height: 16px;

      //margin: 0;
      color: ${colours.functional.brandColour};
      font-weight: 400;

      .rank {
        font-family: ${fonts.supporting};
        color: ${({ sectionColour }) => sectionColour};
      }

      td {
        border-bottom: 1px solid ${colours.functional.keyline};
        padding: 16px;
      }
    }
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

export const ShowMoreButton = styled.button`
  font-family: ${fonts.supporting};
  font-size: 12px;
  width: 96px;
  height: 32px;
  background: inherit;
  border: 1px solid black;
  line-height: 32px;
  margin: auto;
  margin-top: 16px;
  display: block;
`;
