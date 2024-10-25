/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { breakpoints, colours } from "@times-components/ts-styleguide";

export const ShareAndSaveContainer = styled.div<{$isSharingSavingEntitlementEnabled: boolean}>`
  border-top-color: ${colours.functional.keyline};
  border-top-style: solid;
  border-top-width: 1px;
  width: 56.2%;
  margin: 0 auto;
  display: ${props => (props.$isSharingSavingEntitlementEnabled ? "flex" : "none")};

  @media (max-width: ${breakpoints.huge}px) {
    display: none;
  }

  ${props =>
    props.showBottomBorder &&
    `border-bottom-color: ${colours.functional.keyline};
     border-bottom-style: solid;
     border-bottom-width: 1px;`};
`;

export const BreadcrumbContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding-bottom: 8px;

  ${props =>
    props.$border
      ? `
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-style: solid;
    border-bottom-width: 1px;
  `
      : ""};
  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;
