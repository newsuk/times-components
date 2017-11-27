import { View } from "react-native";
import styled from "styled-components";

const mediumBreakpoint = "768px";

export const ResponsiveWrapper = styled(View)`
  padding-left: 10px;
  padding-right: 10px;

  @media (min-width: ${mediumBreakpoint}) {
    width: 83.333333333333%;
    margin: 0 auto;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

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

export const LeadAsset = styled(View)`
  margin-bottom: 10px;
`;

export const ArticleTextElement = styled(View)`
  font-family: "TimesDigitalW04";
  line-height: 26px;
  font-size: 17px;
  margin-bottom: 25px;
  color: "#333333";
`;

export const ArticleMainContentRow = styled(View)`
  padding-left: 10px;
  padding-right: 10px;
`;
