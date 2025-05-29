import {
  colours,
  fontFactory,
  spacing,
  tabletWidth,
  breakpoints,
  fontSizes,
  fontsWithFallback
} from "@times-components/ts-styleguide";
import styled from "styled-components";

export const NativeAd = styled.div`
  clear: both;
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
  font: normal ${fontSizes.teaser}px / 17px ${fontsWithFallback.bodyRegular};
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

const styles = {
  extrasErrorBody: {
    ...fontFactory({
      font: "supporting",
      fontSize: "tertiary"
    }),
    color: colours.functional.secondary,
    maxWidth: 330,
    textAlign: "center"
  },
  extrasErrorButton: {
    marginBottom: spacing(0),
    marginTop: spacing(5),
    maxWidth: 165
  },
  extrasErrorContainer: {
    alignItems: "center",
    borderStyle: "solid",
    borderTopColor: colours.functional.keyline,
    borderTopWidth: 1,
    marginBottom: spacing(10),
    width: "100%"
  },
  extrasErrorHeadline: {
    color: colours.functional.primary,
    ...fontFactory({
      font: "headline",
      fontSize: "commentsHeadline"
    }),
    maxWidth: 315,
    paddingBottom: spacing(2),
    paddingTop: spacing(6),
    textAlign: "center"
  },
  relatedArticlesTablet: {
    alignSelf: "center",
    maxWidth: tabletWidth,
    width: "100%"
  }
};

export const PromotedContentContainer = styled.div`
  border-top: 2px solid #1d1d1b;
  background-color: #f5f5f5;
  padding: 16px 10px 24px;
  margin-block-start: 20px;

  &:not(:last-child) {
    margin-block-end: 32px;
  }

  @media (min-width: ${breakpoints.medium}px) {
    padding: 16px 20px 24px;
  }

  @media (min-width: ${breakpoints.wide}px) {
    margin-block-start: 28px;
    margin-block-end: 32px;
    margin-inline: 20px;
  }
`;

export const PromotedContentTitle = styled.span`
  display: block;
  font-family: "Roboto";
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #333333;
`;

export const PromotedContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 32px;
  margin-block-start: 16px;
  min-height: 50px;

  @media (min-width: ${breakpoints.wide}px) {
    grid-template-columns: repeat(4, 1fr);
    min-height: 50px;
  }
`;

export const PromotedContentAd = styled.div`
  position: relative;
  min-height: 150px;

  &:nth-child(1)::after,
  &:nth-child(4)::after {
    position: absolute;
    content: "";
    top: 0;
    right: -16px;
    width: 1px;
    height: 100%;
    background-color: #e4e4e4;
  }
  @media (min-width: ${breakpoints.wide}px) {
    &:not(:last-child)::after {
      position: absolute;
      content: "";
      top: 0;
      right: -16px;
      width: 1px;
      height: 100%;
      background-color: #e4e4e4;
    }
  }
`;

export const PromotedContentSectionDivider = styled.div`
  border-top: 1px solid #e4e4e4;
  grid-column: 1 / 3;
  @media (min-width: ${breakpoints.wide}px) {
    display: none;
  }
`;

export default styles;
