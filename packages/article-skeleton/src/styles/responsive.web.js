import { View, Dimensions } from "react-native";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";

const windowWidth = Dimensions.get("window").width;

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
  ${props =>
    props.isSticky && windowWidth <= breakpoints.huge
      ? `width: 100% !important;
      opacity: 0.98;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
      margin: ${spacing(6)} 0 !important`
      : ""};

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

export const RefContainer = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${colours.functional.keyline};

  ${props =>
    props.isSticky && windowWidth <= breakpoints.huge ? "border: 0;" : ""};

  ${props =>
    props.isSticky && windowWidth <= breakpoints.medium
      ? `padding: 0 ${spacing(2)};`
      : ""};

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;
