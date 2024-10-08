import styled from "styled-components";
import { TcView } from "@times-components/utils";
import { breakpoints, colours, spacing } from "@times-components/ts-styleguide";
import { ArticleKeylineItem } from "../keylines";

export const getHeaderAdStyles = template => {
  const hideKeylines = template === "indepth";

  return styled(TcView)`
    box-sizing: content-box;
    justify-content: center;
    min-height: 50px;
    display: flex;
    border-top-color: ${colours.functional.keyline};
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: ${hideKeylines ? "0" : "1px"};
    padding-top: ${spacing(2)};
    padding-bottom: ${hideKeylines ? "0" : spacing(2)};
    @media (min-width: 768px) {
      min-height: 90px;
    }

    @media (min-width: 1024px) {
      min-height: 250px;
    }
  `;
};

export const MainContainer = styled.main`
  @media (min-width: ${breakpoints.wide}px) {
    padding-top: ${spacing(4)};
    margin: 0 auto;
  }
`;

export const HeaderContainer = styled(TcView)`
  display: flex;
  z-index: 1;

  /* stylelint-disable */
  > ${ArticleKeylineItem} {
    order: 3;
  }
  /* stylelint-enable */
`;

export const BodyContainer = styled.article`
  display: block;
  order: 4;
`;

export const UpdateButtonContainer = styled.div`
  position: sticky;
  bottom: 50px;
  display: flex;
  width: 100%;
  justify-content: center;
  @media (min-width: ${breakpoints.medium}px) {
    bottom: 80px;
  }
  @media (min-width: ${breakpoints.wide}px) {
    bottom: 120px;
  }
`;

export const SidebarWarpper = styled.div`
  position: sticky;
  top: 162px;
  display: none;
  left: 100%;

  @media (min-width: ${breakpoints.wide}px) {
    width: 19.8333%;
    display: inline-block;
  }
  @media (min-width: ${breakpoints.huge}px) {
    width: 18.8333%;
    top: 112px;
  }
`;

export const PuzzlesSidebar = styled.div`
  position: sticky;
  padding-left: ${spacing(4)};
  z-index: 1;

  @media (min-width: ${breakpoints.wide}px) {
    padding-right: ${spacing(8)};
  }
  @media (min-width: ${breakpoints.huge}px) {
    padding-right: ${spacing(10)};
  }
`;

export const ArticleWrapper = styled.div`
  position: relative;
`;

export const ArticleContent = styled.div`
  @media (min-width: ${breakpoints.wide}px) {
    margin-top: ${({ showMargin }) => (showMargin ? "-335px" : "0")};
    transition: margin-top 0.2s ease;
  }
`;

export const EmailBannerContainer = styled.div`
  position: sticky;
  top: 80px;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  height: 100%;
  @media (max-width: ${breakpoints.medium}px) {
    max-width: 327px;
    height: 100px;
    margin: auto;
  }
`;
