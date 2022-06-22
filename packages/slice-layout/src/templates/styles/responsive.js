import { TcView } from "@times-components/utils";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/ts-styleguide";

export const SliceContainer = styled(TcView)`
  align-items: center;
  border-bottom-color: ${colours.functional.keyline};
  border-bottom-width: 1px;
  border-style: solid;
  flex: 1;
  justify-content: center;

  @media (-webkit-min-device-pixel-ratio: 2) {
    border-bottom-width: 0.5px;
  }
`;

export const getSeparator = ({ hasLeftRightMargin }) => styled(TcView)`
  border-bottom-color: ${colours.functional.keyline};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  flex: 1;
  margin-bottom: ${spacing(2)};
  margin-top: ${spacing(2)};
  min-width: auto;

  @media (min-width: ${breakpoints.medium}px) {
    border-bottom: none;
    border-right-color: ${colours.functional.keyline};
    border-right-style: solid;
    border-right-width: 1px;
    flex: 0 !important;
    margin: ${hasLeftRightMargin ? `0 ${spacing(2)}` : "0"};
  }
`;
