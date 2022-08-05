import styled from 'styled-components';
import { breakpoints, fonts } from '@times-components/ts-styleguide';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;

  @media (min-width: ${breakpoints.medium}px) {
    padding: 88px;
  }
`;

export const Title = styled.div`
  font-family: ${fonts.headline};
  font-size: 32px;
  line-height: 32px;
  letter-spacing: 0;
  text-align: center;
  padding: 24px;
`;
export const Description = styled.div`
  font-family: ${fonts.body};
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0;
  text-align: center;
  max-width: 660px;
`;
export const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  background-color: #008387;
  color: white;
  font-family: ${fonts.supporting};
  width: 127px;
  height: 48px;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;

  margin: 24px;
`;
