import {
  colours,
  fontFactory,
  spacing,
  tabletWidth,
  breakpoints,
  fontSizes,
  fontsWithFallback
} from "@times-components/ts-styleguide";
import styled from 'styled-components';

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

export default styles;
