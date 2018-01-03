import { View, Text } from "react-native";
import styled from "styled-components";
import config from "../responsive-config";

export const HeadlineContainer = styled(Text)`
  font-size: 30px;
  color: #1d1d1b;
  margin-bottom: 8px;
  font-family: "TimesModern-Bold";
  font-weight: 400;
  line-height: 30px;

  @media (min-width: ${config.mediumBreakpoint}) {
    font-size: 45px;
    line-height: 45px;
  }
`;
export const LabelContainer = styled(View)`
  @media (min-width: ${config.wideBreakpoint}) {
    margin-top: 0px;
  }
`;
