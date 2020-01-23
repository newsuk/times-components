import { View } from "react-native";
import styled, { css } from "styled-components";
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
  margin-bottom: ${spacing(4)};

  ${props =>
    props.fullWidth
      ? css`
          width: 100%;
        `
      : css`
          padding: 0 ${spacing(2)};

          @media (min-width: ${breakpoints.medium}px) {
            width: 80.8%;
            margin-left: auto;
            margin-right: auto;
            padding: 0;
          }

          @media (min-width: ${breakpoints.wide}px) {
            width: 56.2%;
          }
        `};
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
  display: none;

  @media (min-width: ${breakpoints.wide}px) {
    display: flex;
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

export const FullWidthImg = styled(View)`
  padding-bottom: ${spacing(4)};
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

const sharedHeadingStyles = `color: ${colours.functional.primary};
  font-family: "${fonts.headline}";
  font-weight: 400;
  margin: 0 auto ${spacing(2)};
  padding-right: ${spacing(2)};
  padding-left: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0;
    padding-right: 0;
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }`;

export const Heading2 = styled.h2`
  ${sharedHeadingStyles}
  font-size: ${fontSizes.heading2Mobile}px;
  line-height: ${fontSizes.heading2Mobile}px;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.heading2}px;
    line-height: ${fontSizes.heading2}px;
  }
`;

export const Heading3 = styled.h3`
  ${sharedHeadingStyles}
  font-size: ${fontSizes.heading3Mobile}px;
  line-height: ${fontSizes.heading3Mobile}px;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.heading3}px;
    line-height: ${fontSizes.heading3}px;
  }
`;

export const Heading4 = styled.h4`
  ${sharedHeadingStyles}
  font-size: ${fontSizes.heading4Mobile}px;
  line-height: ${fontSizes.heading4Mobile}px;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.heading4}px;
    line-height: ${fontSizes.heading4}px;
  }
`;

export const Heading5 = styled.h5`
  ${sharedHeadingStyles}
  font-size: ${fontSizes.heading5Mobile}px;
  line-height: ${fontSizes.heading5Mobile}px;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.heading5}px;
    line-height: ${fontSizes.heading5}px;
  }
`;

export const Heading6 = styled.h6`
  ${sharedHeadingStyles}
  font-size: ${fontSizes.heading5Mobile}px;
  line-height: ${fontSizes.heading5Mobile}px;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.heading5}px;
    line-height: ${fontSizes.heading5}px;
  }
`;
