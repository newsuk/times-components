import { TcView } from "@times-components/utils";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/ts-styleguide";

export const ChildContainer = styled(TcView)`
  flex: 1;
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    flex-basis: 0 !important;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const getChildrenContainer = ({ childCount }) => {
  let Base = styled(TcView)`
    flex: 1;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: ${spacing(2)};
    padding-top: ${spacing(2)};
    width: 100%;

    @media (min-width: ${breakpoints.medium}px) {
      flex-direction: row;
    }
  `;

  if (childCount >= 3) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        padding-left: ${spacing(4)};
        padding-right: ${spacing(4)};
        width: 100%;
      }
    `;
  } else {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        width: 80.8%;
      }
    `;
  }

  Base = styled(Base)`
    @media (min-width: ${breakpoints.wide}px) {
      width: ${childCount >= 3 ? "100%" : "56.2%"};
    }
  `;

  return Base;
};
