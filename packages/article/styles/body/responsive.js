import { View, Text } from "react-native";
import styled from "styled-components";

const mediumBreakpoint = "768px";
const wideBreakpoint = "1024px";

const mediumBpWidth = "83.33333333%";
const wideBpWidth = "58.33333%";

const mediumBpPositioning = `
  @media (min-width: ${mediumBreakpoint}) {
    width: ${mediumBpWidth};
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }
`;
const wideBpPositioning = `
  @media (min-width: ${wideBreakpoint}) {
    width: ${wideBpWidth};
  }
`;

const showHideToggle = (show, styles) =>
  `
  display: ${show ? "flex" : "none"};
  @media (min-width: ${wideBreakpoint}) {
    display: ${show ? "none" : "flex"};
    ${styles || ""}
  }
  `;

const articleContainerPadding = `
  padding-left: 10px;
  padding-right: 10px;
`;

export const MainContainer = styled(View)`
  @media (min-width: ${wideBreakpoint}) {
    padding-left: 0;
    padding-right: 20px;
    margin: 0 auto;
  }
`;

/* --- Header --- */

export const HeaderContainer = styled(View)`
  ${articleContainerPadding} ${mediumBpPositioning} @media (min-width: ${wideBreakpoint}) {
    width: 100%;
    width: ${wideBpWidth};
  }
`;

export const HeadlineContainer = styled(Text)`
  font-size: 30px;
  color: #1d1d1b;
  margin-bottom: 8px;
  font-family: "TimesModern-Bold";
  font-weight: 400;
  line-height: 30px;

  @media (min-width: ${mediumBreakpoint}) {
    font-size: 45px;
    line-height: 45px;
  }
`;
export const LabelContainer = styled(View)`
  @media (min-width: ${wideBreakpoint}) {
    margin-top: 20px;
  }
`;

export const FlagContainer = styled(View)`
  @media (min-width: ${wideBreakpoint}) {
    margin-bottom: 30px;
  }
`;

/* --- Meta --- */

export const MetaContainer = styled(View)`
  ${articleContainerPadding} ${mediumBpPositioning} @media (min-width: ${wideBreakpoint}) {
    margin-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    position: absolute;
    top: 0;
    width: 20.8333%;
  }
`;

export const MetaElementContainer = styled(Text)`
  padding: 12px 0 9px;
  @media (min-width: ${wideBreakpoint}) {
    line-height: 18px;
    padding: 5px 0 25px;
  }
`;

/* --- Body --- */

export const ParagraphContainer = styled(View)`
  ${articleContainerPadding} ${mediumBpPositioning} ${wideBpPositioning};
`;

export const Paragraph = styled(Text)`
  color: "#333333";
  font-family: "TimesDigitalW04";
  line-height: 26px;
  font-size: 17px;
  line-height: 26px;
  margin-bottom: 25px;

  margin-top: 0;

  @media (min-width: ${mediumBreakpoint}) {
    font-size: 18px;
    line-height: 30px;
  }
`;

/* --- Lead Asset Styles --- */

export const LeadAsset = styled(View)`
  margin-bottom: 10px;
  @media (min-width: ${mediumBreakpoint}) {
    margin-bottom: 20px;
  }
  @media (min-width: ${wideBreakpoint}) {
    width: 100%;
    margin: 0 auto;
  }
`;

export const LeadAssetMobile = styled(View)`
  ${showHideToggle(true)};
`;

export const LeadAssetDesktop = styled(View)`
  ${showHideToggle(
    false,
    `
    width: ${wideBpWidth};
    margin: 0 auto;
    // Temp padding for feature flag release
    padding-bottom: 20px;
  `
  )};
`;

export const MediaContainerMobile = styled(View)`
  ${showHideToggle(true)};
`;

export const MediaContainerDesktop = styled(View)`
  ${showHideToggle()};
`;

/* --- Article Images --- */

export const PrimaryContainer = styled(View)`
  width: 100%;
  flex-direction: column;
  padding-bottom: 25px;

  @media (min-width: ${mediumBreakpoint}) {
    width: ${mediumBpWidth};
    margin: 0 auto;
  }
  ${wideBpPositioning};
`;

export const SecondaryContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 25px;
  padding-left: 10px;
  padding-right: 10px;

  ${mediumBpPositioning} ${wideBpPositioning};
`;

export const InlineContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 25px;
  padding-left: 10px;
  padding-right: 10px;

  ${mediumBpPositioning} ${wideBpPositioning};
`;
