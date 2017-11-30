import { View, Text } from "react-native";
import styled from "styled-components";
import config from "../responsive-config";

/* --- Body --- */

export const ParagraphContainer = styled(View)`
  ${config.articleContainerPadding} ${config.mediumBpPositioning} ${config.wideBpPositioning};
`;

export const Paragraph = styled(Text)`
  color: "#333333";
  font-family: "TimesDigitalW04";
  line-height: 26px;
  font-size: 17px;
  line-height: 26px;
  margin-bottom: 25px;
  margin-top: 0;

  @media (min-width: ${config.mediumBreakpoint}) {
    font-size: 18px;
    line-height: 30px;
  }
`;

/* --- Lead Asset Styles --- */

export const LeadAsset = styled(View)`
  margin-bottom: 10px;
  @media (min-width: ${config.mediumBreakpoint}) {
    margin-bottom: 20px;
  }
  @media (min-width: ${config.wideBreakpoint}) {
    width: 100%;
    margin: 0 auto;
  }
`;

export const LeadAssetMobile = styled(View)`
  ${config.showHideToggle(true)};
`;

export const LeadAssetDesktop = styled(View)`
  ${config.showHideToggle(
    false,
    `
    width: ${config.wideBpWidth};
    margin: 0 auto;
    // Temp padding for feature flag release
    padding-bottom: 20px;
  `
  )};
`;

export const MediaContainerMobile = styled(View)`
  ${config.showHideToggle(true)};
`;

export const MediaContainerDesktop = styled(View)`
  ${config.showHideToggle()};
`;

/* --- Article Images --- */

export const PrimaryImg = styled(View)`
  width: 100%;
  flex-direction: column;
  padding-bottom: 25px;

  @media (min-width: ${config.mediumBreakpoint}) {
    width: ${config.mediumBpWidth};
    margin: 0 auto;
  }
  ${config.wideBpPositioning};
`;

export const SecondaryImg = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 25px;
  padding-left: 10px;
  padding-right: 10px;

  ${config.mediumBpPositioning} ${config.wideBpPositioning};
`;

export const InlineImg = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 25px;
  padding-left: 10px;
  padding-right: 10px;

  ${config.mediumBpPositioning} ${config.wideBpPositioning};
`;
