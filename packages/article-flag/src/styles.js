import styled from "styled-components";
import { gqlRgbaToStyle } from "@times-components/utils";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const IconContainer = styled.div`
  border-radius: 2.5px;
  height: 5px;
  width: 5px;
  background-color: ${({color}) => gqlRgbaToStyle(color) || color};
`;

export const TextContainer = styled.div`
  font-family: TimesDigitalW04-RegularSC;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.6px;
  line-height: 12px;
  margin-left: 5px;
  color: ${({color}) => gqlRgbaToStyle(color) || color};
`
export const FlagPadding = styled.div`
  margin-right: ${({allFlags}) => allFlags.length > 1 ? "15px" : 0 };
`
export const Flags = styled.div`
  display: flex;    
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`
export const FlagsContainer = styled.div`
  margin-bottom: 15px;
  margin-top: 5px;
`
