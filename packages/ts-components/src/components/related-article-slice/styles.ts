import styled from 'styled-components';
import { colours, fonts } from '@times-components/styleguide';

export const Container = styled.div`
  display: none;
  .heading {
    text-align: center;
    font-family: ${fonts.headline};
    font-size: 40px;
    line-height: 40px;
    padding: 24px;
    margin: 40px 0;
    border-top: 1px solid ${colours.functional.keyline};
    border-bottom: 1px solid ${colours.functional.keyline};
  }
`;
