import styled from "styled-components";
import { View } from "react-native";

const mediumBreakpoint = "768px";

export const PrimaryContainer = styled(View)`
  width: 100%;
  flex-direction: column;
  padding-bottom: 25px;

  @media (min-width: ${mediumBreakpoint}) {
    width: 83.33333333%;
    margin: 0 auto;
  }
`;

export const SecondaryContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 25px;
  padding-left: 10px;
  padding-right: 10px;

  @media (min-width: ${mediumBreakpoint}) {
    width: 83.33333333%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const InlineContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 25px;
  padding-left: 10px;
  padding-right: 10px;

  @media (min-width: ${mediumBreakpoint}) {
    width: 83.33333333%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
`;
