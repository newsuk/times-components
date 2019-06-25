/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { breakpoints, colours } from "@times-components/styleguide";

export const ShareAndSaveContainer = styled.div`
  border-top-color: ${colours.functional.keyline};
  border-top-style: solid;
  border-top-width: 1px;
  width: 56.2%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.huge}px) {
    display: none;
  }

  ${props =>
    props.showBottomBorder &&
    `border-bottom-color: ${colours.functional.keyline};
     border-bottom-style: solid;
     border-bottom-width: 1px;`};
`;
