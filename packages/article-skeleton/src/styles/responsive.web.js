import { View, Dimensions } from "react-native";
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

export const isStickyAllowed = maxStickyWidth =>
  Dimensions.get("window").width <= maxStickyWidth;

const STICKY_STYLES = css`
  width: 100% !important;
  opacity: 0.98;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
  margin: ${spacing(6)} 0 !important;
`;

export const SaveShareContainer = styled(View)`
  ${props => (props.isSticky ? STICKY_STYLES : "")};

  background-color: ${colours.functional.white};
  height: 55px;
  margin: ${spacing(6)} ${spacing(2)};

  @media (max-width: ${breakpoints.huge}px) {
    position: sticky;
    left: 0;
    top: 0;
    z-index: 999;
  }
`;

const REF_STICKY_STYLES = css`
  border: 0;
  @media (max-width: ${breakpoints.medium}px) {
    padding: 0 ${spacing(2)};
  }
`;

export const SaveShareRefContainer = styled(View)`
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${colours.functional.keyline};

  ${props => (props.isSticky ? REF_STICKY_STYLES : "")};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;
