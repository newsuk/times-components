import styled from 'styled-components';
import { breakpoints } from '@times-components/ts-styleguide';
import { IconContainer } from "../save-star/styles";

export const CardContainer = styled.div`
  padding: 24px;
  height: auto;
  width: auto;
  border: 1px solid #E4E4E4;
  background-color: #F5F5F5;
  margin: 0;
  max-width: 460px;
`;

export const Header = styled.div`
  display: flex;
`;

export const CustomIconContainer = styled(IconContainer)`
  height: auto;
  width: auto;
  margin-right: 8px;
  svg {
    fill: #1573a2; 
    width: 20px;    
    height: 20px;   
  }
`;

export const Title = styled.h1`
  color: #005C8A;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 112.5%;
  margin: 0;

  @media (max-width: ${breakpoints.medium}px) {
    font-size: 18px;
  }
`;

export const Paragraph = styled.p`
  color: #333;
font-family: Roboto;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 150%;

  @media (max-width: ${breakpoints.medium}px) {
    font-size: 16px;
  }
`;

export const EnableButton = styled.button`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  background-color: #005C8A;
  padding: 8px 12px;
  width: 100%;
  justify-content: center;
  color: #FFFFFF;
  border: none;

`;

export const AllowButton = styled.button`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  color: #333333;
  width: 100%;
  justify-content: center;
  margin-top: 12px;
  padding: 8px 12px;

`;

export const LinkPrivacyManager = styled.a`
  color: #00527A;
`;
