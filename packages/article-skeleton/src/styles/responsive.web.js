import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";
import { STICKY_CLASS_NAME } from "@times-components/sticky";

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
export const SaveShareContainer = styled.div`
  position: relative;
  margin: 0 auto;
  height: 60px;

  @media (max-width: ${breakpoints.medium - 1}px) {
    padding: 0 ${spacing(2)};
  }

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }

  &:before,
  &:after {
    content: "";
    height: 1px;
    background-color: ${colours.functional.keyline};
    position: absolute;
    left: 0;
    right: 0;
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }
`;

export const OuterSaveShareContainer = styled.div`
  margin: 0px auto ${spacing(6)};
  background-color: ${colours.functional.white};

  &.${STICKY_CLASS_NAME} {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);

    /* stylelint-disable */
    ${SaveShareContainer} {
      &:before,
      &:after {
        display: none;
      }
    }
    /* stylelint-enable */
  }
`;
