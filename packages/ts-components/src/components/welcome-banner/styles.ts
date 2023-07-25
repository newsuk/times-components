import styled from 'styled-components';
import { colours, fonts } from '@times-components/ts-styleguide';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 38px 33px 34px;
  border: 1px solid ${colours.functional.primary};
`;

export const Title = styled.div`
  font-family: ${fonts.headline};
  font-size: 28px;
  color: ${colours.functional.greyText};
  text-align: center;
`;

export const Text = styled.div`
  font-family: ${fonts.supporting};
  font-size: 18px;
  color: ${colours.functional.primary};
  padding-top: 9px;
  text-align: center;
`;
