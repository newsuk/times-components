import styled from "styled-components";
import { View } from "react-native";

const mediumBreakpoint = "768px";

export const ImageContainer = styled(View)`
  flex-grow: 1;
  flex-shrink: 1 !important;

  margin-bottom: 10px;
  @media (min-width: ${mediumBreakpoint}) {
    flex-grow: 2;
    flex-basis: 0 !important;
    margin-right: 10px;
    margin-bottom: 0;
  }
`;

export const SummaryContainer = styled(View)`
  flex-grow: 1;
  flex-shrink: 1 !important;

  @media (min-width: ${mediumBreakpoint}) {
    flex-grow: 3;
    flex-basis: 0 !important;
  }
`;

export const CardContainer = styled(View)`
  flex-direction: column;

  @media (min-width: ${mediumBreakpoint}) {
    flex-direction: row;
  }
`;
