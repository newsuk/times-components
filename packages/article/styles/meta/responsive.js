import { Text, View } from "react-native";
import styled from "styled-components";
import config from "../responsive-config";

export const MetaTextElement = styled(Text)`
  padding: 12px 0 9px;
  @media (min-width: ${config.wideBreakpoint}) {
    line-height: 18px;
    padding: 5px 0 25px;
  }
`;

export const Meta = styled(View)`
  margin-left: 10px;
  margin-right: 10px;

  @media (min-width: ${config.mediumBreakpoint}) {
    margin-left: 0;
    margin-right: 0;
  }

  @media (min-width: ${config.wideBreakpoint}) {
    padding-top: 0px;
  }
`;
