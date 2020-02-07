import { View } from "react-native";
import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes,
  spacing
} from "@times-components/styleguide";

/* --- Body --- */

export const ParagraphContainer = styled.div`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const Paragraph = styled.p`
  color: ${colours.functional.primary};
  font-family: "${fonts.bodyRegular}";
  line-height: 26px;
  font-size: ${fontSizes.bodyMobile}px;
  margin-bottom: ${spacing(5)};
  margin-top: 0;
  display: block;

  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.body}px;
    line-height: 30px;
  }
`;

export const InteractiveContainer = styled.div`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  margin-bottom: ${spacing(4)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
    margin-bottom: ${spacing(4)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

/* --- Lead Asset Styles --- */

export const LeadAsset = styled(View)`
  margin-bottom: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    margin-bottom: ${spacing(4)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
    margin: 0 auto;
    padding-bottom: 20px;
  }
`;

export const LeadAssetCaptionContainer = styled(View)`
  margin-left: ${spacing(2)};
  margin-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 100%;
  }
`;

/* --- Article Images --- */

export const PrimaryImg = styled(View)`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${spacing(5)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const SecondaryImg = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  padding-bottom: ${spacing(5)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const InlineImg = styled(View)`
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  padding-bottom: 0;
  display: block;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

/* --- Pull Quotes --- */

export const PullQuoteResp = styled(View)`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};
  margin-bottom: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 50%;
    float: left;
    margin-right: ${spacing(4)};
    margin-bottom: 0px;
    margin-top: ${spacing(1)};
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const PullQuoteContainer = styled(View)`
  display: block;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;
