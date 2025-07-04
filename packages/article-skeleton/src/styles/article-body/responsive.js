import { TcView } from "@times-components/utils";
import styled, { css } from "styled-components";
import {
  breakpoints,
  colours,
  fontsWithFallback,
  fontSizes,
  spacing
} from "@times-components/ts-styleguide";

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
  font-family: ${fontsWithFallback.bodyRegular};
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
  position: relative;
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

/* --- Article Images --- */

export const PrimaryImg = styled(TcView)`
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

export const FullWidthImg = styled(TcView)`
  padding-bottom: ${spacing(4)};
`;

export const SecondaryImg = styled(TcView)`
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

export const InlineImg = styled(TcView)`
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

export const PullQuoteResp = styled(TcView)`
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

export const PullQuoteContainer = styled(TcView)`
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
  font-family: ${fontsWithFallback.headline};
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

export const InlineAdWrapper = styled.div`
  clear: both;
  min-height: 283px;
  margin: 30px 0;
  box-sizing: content-box;
  padding: 0 0 10px;
  border-bottom: 1px solid
    ${({ isDark }) => (isDark ? "#4E4E4E" : "rgb(219, 219, 219)")};

  @media (min-width: 768px) {
    min-height: 123px;
  }

  @media (min-width: 1024px) {
    min-height: 283px;
  }
`;

export const InlineAdTitle = styled.span`
  border-bottom: 1px solid
    ${({ isDark }) => (isDark ? "#4E4E4E" : "rgb(219, 219, 219)")};
  color: ${({ isDark }) => (isDark ? "#CCC" : "#696969")};
  flex: 1 1 100%;
  font: normal ${fontSizes.teaser}px / 17px ${fontsWithFallback.bodyRegular};
  letter-spacing: 0.6px;
  margin: 0 0 10px;
  padding: 0 0 5px;
  text-align: center;
  text-transform: uppercase;
  display: block;
`;
