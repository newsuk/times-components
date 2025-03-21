import styled from 'styled-components';
import { breakpoints, fonts } from '@times-components/ts-styleguide';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 28px;

  @media (min-width: ${breakpoints.medium}px) {
    padding-bottom: 48px;
    padding-top: 20px;
  }
`;
export const ContentContainer = styled.div`
  max-width: 343px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${breakpoints.medium}px) {
    max-width: 403px;
  }
`;
export const Title = styled.div`
  font-family: ${fonts.headlineRegular};
  font-weight: 700;
  font-color: #333333;
  font-size: 28px;
  line-height: 32px;
  letter-spacing: 0;
  text-align: center;
  padding: 8px;
`;
export const Description = styled.div`
  font-family: ${fonts.supporting};
  font-weight: 400;
  font-color: #333333;
  font-size: 18px;
  line-height: 27px;
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
  background-color: #005c8a;
  color: white;
  font-family: ${fonts.supporting};
  font-weight: 500;
  width: 100%;
  height: 48px;
  padding: 18.5px 0;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  margin: 16px;
`;
