import { TcView } from "@times-components/utils";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/ts-styleguide";

export const ListContentContainer = styled(TcView)`
  margin: 0 auto;
  max-width: 680px;
  width: 100%;

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${breakpoints.huge}px) {
    max-width: 760px;
  }
`;

export const ListItemWrapper = styled(TcView)`
  padding-bottom: ${spacing(2)};
  padding-top: ${spacing(2)};
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 0;
    padding-right: 0;

    .articleListImage {
      flex: 2;
      margin-bottom: 0;
      max-width: 285px;
      min-width: auto;
      padding-right: ${spacing(3)};
    }
    .articleListContent {
      flex: 2.7;
      flex-basis: 0 !important;
      min-width: auto;
    }
  }
`;

export const ListItemSeparator = styled(TcView)`
  margin-left: ${spacing(2)};
  margin-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

export const ListItemLongText = styled(TcView)`
  display: none;

  @media (min-width: ${breakpoints.medium}px) {
    display: block;
    padding-left: ${spacing(3)};
  }
`;

export const ListItemShortText = styled(TcView)`
  display: block;

  @media (min-width: ${breakpoints.medium}px) {
    display: none;
  }
`;

export const PageErrorContainer = styled(TcView)`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 10%;

  @media (min-width: ${breakpoints.medium}px) {
    padding-left: 15%;
    padding-right: 15%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    flex-direction: row-reverse;
  }
`;

export const PageErrorImageContainer = styled(TcView)`
  align-self: center;
  max-width: 300px;
  width: 100%;

  @media (min-width: ${breakpoints.medium}px) {
    max-width: 428px;
  }

  @media (min-width: ${breakpoints.wide}px) {
    max-width: none;
    width: 50%;
  }
`;

export const PageErrorContentContainer = styled(TcView)`
  @media (min-width: ${breakpoints.wide}px) {
    align-self: center;
    max-width: 428px;
  }
`;

export const InlineAdWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  box-sizing: content-box;
  padding: 10px 0;
  border-top: 1px solid rgb(219, 219, 219);
  border-bottom: 1px solid rgb(219, 219, 219);
  @media (min-width: 768px) {
    min-height: 90px;
  }

  @media (min-width: 1024px) {
    min-height: 250px;
  }
`;
