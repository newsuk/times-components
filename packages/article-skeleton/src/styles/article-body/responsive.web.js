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

export const NativeAd = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto 30px;
  width: 80.8%;
  min-height: 210px;
  @media (min-width: 768px) {
    min-height: 120px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
  &.hidden {
    visibility: hidden;
  }
`;

export const NativeAdTitle = styled.h2`
  border-bottom: 1px solid #dbdbdb;
  color: #333;
  flex: 1 1 100%;
  font: normal ${fontSizes.teaser}px / 17px ${fonts.bodyRegular};
  margin-bottom: 10px;
  padding: 5px 0;
  text-transform: uppercase;
`;

export const Ad = styled.div`
  flex: 1 1 50%;
  @media (max-width: 767px) {
    flex: 1 1 46%;
    &:first-of-type {
      margin-right: 1.5%;
    }
    &:last-child {
      margin-left: 1.5%;
    }
  }
`;

export const InlineAdWrapper = styled.div`
  min-height: 283px;
  margin: 30px 0;
  box-sizing: content-box;
  padding: 0 0 10px;
  border-bottom: 1px solid rgb(219, 219, 219);

  @media (min-width: 768px) {
    min-height: 123px;
  }

  @media (min-width: 970px) {
    min-height: 283px;
  }
`;

export const InlineAdTitle = styled.h2`
  border-bottom: 1px solid rgb(219, 219, 219);
  color: #696969;
  flex: 1 1 100%;
  font: normal ${fontSizes.teaser}px / 17px ${fonts.bodyRegular};
  letter-spacing: 0.6px;
  margin: 0 0 10px;
  padding: 0 0 5px;
  text-align: center;
  text-transform: uppercase;
`;
