import { View, Text } from "react-native";
import styled from "styled-components";

const mediumBreakpoint = "768px";
const wideBreakpoint = "1024px";

export const ResponsiveWrapper = styled(View)`
  padding-left: 10px;
  padding-right: 10px;

  @media (min-width: ${mediumBreakpoint}) {
    width: 83.333333333333%;
    margin: 0 auto;
    padding-left: 0px;
    padding-right: 0px;
  }
  @media (min-width: ${wideBreakpoint}) {
    width: 100%;
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
  @media (min-width: ${wideBreakpoint}) {
    width: 100%;
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
  @media (min-width: ${wideBreakpoint}) {
    width: 100%;
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
  @media (min-width: ${wideBreakpoint}) {
    width: 100%;
  }
`;

export const LeadAsset = styled(View)`
  margin-bottom: 10px;
  @media (min-width: ${wideBreakpoint}) {
    width: 100%;
    margin: 0 auto;
  }
`;

export const ArticleTextElement = styled(Text)`
  font-family: "TimesDigitalW04";
  line-height: 26px;
  font-size: 17px;
  margin-bottom: 25px;
  color: "#333333";
  margin-top: 0;

  @media (min-width: ${mediumBreakpoint}) {
    font-size: 18px;
  }
`;

// export const ArticleMainContentRow = styled(View)`
//   padding-left: 10px;
//   padding-right: 10px;
// `;

export const ArticleMainContainer = styled(View)`
  //padding-left: 10px;
  //padding-right: 10px;
  // @media (min-width: ${mediumBreakpoint}) {
  //   padding-left: 0;
  //   padding-right: 0;
  // }
  @media (min-width: ${wideBreakpoint}) {
    padding-left: 0;
    padding-right: 20px;
    width: 58.33333%;
    margin: 0 auto;
    //flex-direction: row;
  }
`;

export const ArticleHeaderContainer = styled(View)`
padding-left: 10px;
padding-right: 10px;

@media (min-width: ${mediumBreakpoint}) {
    width: 83.33333333%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${wideBreakpoint}) {
    width: 100%;
  }
`;

export const ArticleLeadAssetContainerMobile = styled(View)`
@media (min-width: ${wideBreakpoint}) {
    display: none;
  }
`;

export const ArticleLAContainerDesktop = styled(View)`
display: none;
@media (min-width: ${wideBreakpoint}) {
    display: flex
  }
`;

export const ArticleBodyContainer = styled(View)`
  padding-left: 10px;
  padding-right: 10px;
  @media (min-width: ${mediumBreakpoint}) {
    width: 83.33333333%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
  @media (min-width: ${wideBreakpoint}) {
    width: 100%;
  }
`;

export const ArticleMetaContainer = styled(View)`
  padding-left: 10px;
  padding-right: 10px;

  @media (min-width: ${mediumBreakpoint}) {
    width: 83.33333333%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${wideBreakpoint}) {
      margin-bottom: 20px;
      padding-right: 20px;
      padding-left: 20px;
      top: 0;
      width: 35.71429%;
      left: -35.71429%;
      position: absolute;
  }
`;

export const LAImageContainer = styled(View)`
  display: flex;
  @media (min-width: ${wideBreakpoint}){
    display: none;
  }
`

export const LAArticleImageContainer = styled(View)`
  display: none;
  @media (min-width: ${wideBreakpoint}){
    display: flex;
    // Temp padding for feature flag release
    padding-bottom: 20px;
  }
`



