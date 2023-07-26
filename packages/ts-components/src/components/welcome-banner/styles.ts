import styled from 'styled-components';
import { colours, fonts } from '@times-components/ts-styleguide';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 28px;
  padding: 28px 12px;
  border: 1px solid ${colours.functional.primary};
`;

export const Title = styled.div`
  color: ${colours.functional.greyText};
  font-family: ${fonts.headline};
  font-size: 28px;
  text-align: center;
`;

export const Text = styled.div`
  padding-top: 8px;
  color: ${colours.functional.primary};
  font-family: ${fonts.supporting};
  font-size: 18px;
  text-align: center;
`;
