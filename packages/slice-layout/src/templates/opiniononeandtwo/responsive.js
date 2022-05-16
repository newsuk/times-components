import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/ts-styleguide";

export const getContainer = ({ supportCount }) => styled(View)`
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  height: auto;
  padding-bottom: ${spacing(2)};
  padding-top: ${spacing(2)};
  width: 100%;

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: ${supportCount > 0 ? "row" : "column"};
    width: ${supportCount === 1 ? "100%" : "80.8%"};

    a {
      display: block;
      height: 100%;
    }
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: ${supportCount === 0 ? "56.2%" : "100%"};
  }
`;

export const getOpinionContainer = ({ hasSupports, supportCount }) => {
  let Base = styled(View)`
    flex: 1;
    flex-grow: 1;
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};
    width: ${hasSupports ? "auto" : "100%"};

    @media (min-width: ${breakpoints.medium}px) {
      a > div,
      a > div > div {
        height: 100%;
      }
    }
  `;

  if (hasSupports) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        flex-basis: 0 !important;
        flex-grow: ${supportCount === 1 ? "3" : "1"};
        padding-left: ${spacing(2)};
        padding-right: ${spacing(2)};
      }
    `;
  } else {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        flex-grow: 0;
        padding-left: 0;
        padding-right: 0;
      }
    `;
  }

  if (supportCount === 2) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        border-bottom-color: ${colours.functional.keyline};
        border-bottom-style: solid;
        border-bottom-width: 1px;
        margin-bottom: ${spacing(2)};
        min-width: 100%;
        padding-bottom: ${spacing(2)};
        padding-left: 0;
        padding-right: 0;
      }
    `;
  }

  Base = styled(Base)`
    @media (min-width: ${breakpoints.wide}px) {
      border-bottom: none;
      margin-bottom: 0;
      min-width: auto;
      padding-bottom: 0;
      padding-left: ${spacing(2)};
      padding-right: ${spacing(2)};
    }
  `;

  return Base;
};

export const getSeparator = ({ itemCount }) => styled(View)`
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
    display: ${itemCount === 3 ? "none" : "block"};
    flex: 0 !important;
    margin: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    display: block;
  }
`;

export const getSupportsContainer = ({ supportCount }) => {
  let Base = styled(View)`
    flex: 1;
    flex-direction: column;
    height: auto;

    @media (min-width: ${breakpoints.medium}px) {
      flex-basis: 0 !important;
      flex-direction: row;
    }
  `;

  if (supportCount === 2) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        min-width: 100%;
      }
    `;
  }

  Base = styled(Base)`
    @media (min-width: ${breakpoints.wide}px) {
      min-width: ${supportCount === 1 ? "400px" : "auto"};
    }
  `;

  return Base;
};

export const getSupportContainer = ({ index, supportCount }) => {
  let Base = styled(View)`
    flex: 1;
    flex-wrap: wrap;
    min-height: auto;
    padding-left: ${spacing(2)};
    padding-right: ${spacing(2)};

    @media (min-width: ${breakpoints.medium}px) {
      flex-basis: 0 !important;
    }
  `;

  if (index === 1) {
    Base = styled(Base)`
      border-top-color: ${colours.functional.keyline};
      border-top-style: solid;
      border-top-width: 1px;
      margin-top: ${spacing(2)};
      padding-top: ${spacing(2)};

      @media (min-width: ${breakpoints.medium}px) {
        border-left-color: ${colours.functional.keyline};
        border-left-style: solid;
        border-left-width: 1px;
        border-top: none;
        margin-left: ${spacing(2)};
        margin-top: 0;
        padding-right: ${supportCount === 2 ? 0 : spacing(2)};
        padding-top: 0;
      }

      @media (min-width: ${breakpoints.wide}px) {
        padding-right: ${supportCount === 2 ? spacing(2) : 0};
      }
    `;
  } else {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        padding-left: ${supportCount === 2 ? "0" : spacing(2)};
        padding-right: ${supportCount === 2 ? "0" : spacing(2)};
      }
    `;
  }

  if (supportCount === 2) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        max-width: 50%;
      }
    `;
  } else {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        max-width: 100%;
      }
    `;
  }

  Base = styled(Base)`
    @media (min-width: ${breakpoints.wide}px) {
      padding-left: ${spacing(2)};
    }
  `;

  return Base;
};
