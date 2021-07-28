import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div`
  display: none;
  .heading {
    text-align: center;
    font-family: ${fonts.headline};
    font-size: 25px;
    line-height: 25px;
    padding: 16px;
    margin: 12px 0;
    border-top: 1px solid ${colours.functional.keyline};
    border-bottom: 1px solid ${colours.functional.keyline};

    @media (min-width: ${breakpoints.medium}px) {
      font-size: 28px;
      line-height: 28px;
    }

    @media (min-width: ${breakpoints.wide}px) {
      padding: 20px;
      font-size: 36px;
      line-height: 36px;
    }
  }
`;
