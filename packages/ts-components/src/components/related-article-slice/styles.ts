import styled from 'styled-components';
import { colours, fonts } from '@times-components/styleguide';

export const Container = styled.div`
  .heading {
    text-align: center;
    font-family: ${fonts.headline};
    font-size: 28px;
    padding: 16px;
    margin: 16px 0;
    border-top: 1px solid ${colours.functional.keyline};
    border-bottom: 1px solid ${colours.functional.keyline};
  }
`;
