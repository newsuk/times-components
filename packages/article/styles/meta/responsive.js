import { Text, View } from "react-native";
import styled from "styled-components";
import config from "../responsive-config";

export const MetaElement = styled(Text)`
  padding: 12px 0 9px;
  @media (min-width: ${config.wideBreakpoint}) {
    line-height: 18px;
    padding: 5px 0 25px;
  }
`;

export const Meta = styled(View)`
  @media (min-width: ${config.wideBreakpoint}) {
    padding-top: 0px;
  }
`;
