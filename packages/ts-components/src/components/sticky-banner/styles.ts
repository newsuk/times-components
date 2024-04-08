import { fonts } from "@times-components/ts-styleguide";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 498px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  z-index: 100;
  border-top: 3px solid #005C8A;
  box-shadow: 0px 16px 24px 0px rgba(17, 17, 17, 0.08);
  background: white;
`;

export const IconContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

export const ContentContainer = styled.div`
  font-size: 14px;

`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #333;
  font-family: ${fonts.supporting};
`;
export const Description = styled.div`
  font-weight: 400;
  line-height: 24px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
`;