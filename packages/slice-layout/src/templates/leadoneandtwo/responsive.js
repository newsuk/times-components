import { TcView } from "@times-components/utils";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/ts-styleguide";

export const getContainer = ({ hasSupports }) => {
  let Base = styled(TcView)`
    flex: 1;
    flex-direction: column;
    flex-wrap: wrap;
    height: auto;
    padding-bottom: ${spacing(2)};
    padding-top: ${spacing(2)};
    width: 100%;

    @media (min-width: ${breakpoints.medium}px) {
      flex-direction: row;
      padding-bottom: ${spacing(2)};
    }
  `;

  if (hasSupports) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        width: 100%;
      }
    `;
  } else {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        padding-left: 0px;
        padding-right: 0px;
        width: 80.8%;
      }
    `;
  }

  Base = styled(Base)`
    @media (min-width: ${breakpoints.wide}px) {
      width: ${hasSupports ? "100%" : "56.2%"};
    }
  `;

  return Base;
};

export const getLeadContainer = ({ hasSupports, supportCount }) => {
  let Base = styled(TcView)`
    flex: 1;
    flex-grow: 1;
    padding-bottom: 0;
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};
    width: ${hasSupports ? "auto" : "100%"};
  `;

  if (hasSupports) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        flex-basis: 0 !important;
        flex-grow: ${supportCount === 1 ? "3" : "2"};
        padding-left: ${spacing(2)};
        padding-right: ${spacing(2)};
      }
    `;
  } else {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        padding-left: 0;
        padding-right: 0;
      }
    `;
  }

  Base = styled(Base)`
    @media (min-width: ${breakpoints.wide}px) {
      flex-grow: ${supportCount === 1 ? "2.75" : "1.5"};
    }
  `;

  return Base;
};

export const SupportsContainer = styled(TcView)`
  flex: 1;
  flex-direction: column;
  height: auto;

  @media (min-width: ${breakpoints.medium}px) {
    flex-basis: 0 !important;
  }
`;

export const getSupportContainer = ({ index }) => {
  if (index > 0) {
    return styled(TcView)`
      padding-left: ${spacing(2)};
      padding-right: ${spacing(2)};
      border-top-color: ${colours.functional.keyline};
      border-top-style: solid;
      border-top-width: 1px;
      margin-top: ${spacing(2)};
      padding-top: ${spacing(2)};

      @media (min-width: ${breakpoints.medium}px) {
        margin-left: ${spacing(2)};
        margin-right: ${spacing(2)};
        padding-left: 0;
        padding-right: 0;
      }

      @media (min-width: ${breakpoints.wide}px) {
        margin-top: ${spacing(2)};
      }
    `;
  }

  return styled(TcView)`
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};

    @media (min-width: ${breakpoints.medium}px) {
      margin-left: ${spacing(2)};
      margin-right: ${spacing(2)};
      padding-left: 0;
      padding-right: 0;
    }

    @media (min-width: ${breakpoints.wide}px) {
      margin-top: 0;
    }
  `;
};
