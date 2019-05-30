import { View } from "react-native";
import styled, { css } from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";

export const MainContainer = styled(View)`
  display: block;
  @media (min-width: ${breakpoints.wide}px) {
    padding-top: ${spacing(4)};
    margin: 0 auto;
  }
`;

/* --- HeaderAd --- */
export const HeaderAdContainer = styled(View)`
  display: none;

  @media (min-width: ${breakpoints.medium}px) {
    display: flex;
    border-top-color: ${colours.functional.keyline};
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: 1px;
    padding-top: ${spacing(2)};
    padding-bottom: ${spacing(2)};
  }
`;

export const BodyContainer = styled(View)`
  display: block;
  order: 3;
`;

/* --- SaveAndShareBar --- */

export const SaveShareInnerContainer = styled.div`
  position: relative;
  padding: 0 ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

const NON_STICKY_CSS = css`
  &:before,
  &:after {
    content: "";
    height: 1px;
    background-color: ${colours.functional.keyline};
    position: absolute;
    left: ${spacing(2)};
    right: ${spacing(2)};
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }
`;

export const SaveShareContainer = styled.div`
  background-color: ${colours.functional.white};
  height: 55px;
  margin: ${spacing(6)} 0;

  @media (max-width: ${breakpoints.huge}px) {
    position: sticky;
    left: 0;
    top: 0;
    z-index: 999;

    &.sticky {
      width: 100% !important;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
    }

    /* stylelint-disable */
    &:not(.sticky) ${SaveShareInnerContainer} {
      ${NON_STICKY_CSS};
    }
    /* stylelint-enable */
  }

  @media (min-width: ${breakpoints.huge + 1}px) {
    /* stylelint-disable */
    ${SaveShareInnerContainer} {
      ${NON_STICKY_CSS};
    }
    /* stylelint-enable */
  }
`;
