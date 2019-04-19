import { View, Dimensions } from "react-native";
import styled from "styled-components";
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
export const SaveShareContainer = styled(View)`
  ${props => props.isSticky && (Dimensions.get("window").width <= breakpoints.huge)
    ? `width: 100% !important;
      border: 0;
      background-color: #fff;
      opacity: 0.98;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
      height: 49px`
    : ""};

  height: 55px;
  margin-top: ${spacing(6)};
  margin-bottom: ${spacing(6)};
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-top-color: ${colours.functional.keyline};
  border-bottom-color: ${colours.functional.keyline};


  @media (max-width: ${breakpoints.huge}px) {
    position: sticky;
    left: 0;
    top: 0;
    z-index: 999;
  }

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;
