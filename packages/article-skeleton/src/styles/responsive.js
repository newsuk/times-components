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

    @media (min-width: 970px) {
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
  z-index: ${({ showAudioPlayer }) => (showAudioPlayer ? 1 : 0)};

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

  @media (min-width: ${breakpoints.wide}px) {
    display: block;
  }
  @media (min-width: ${breakpoints.huge}px) {
    top: 112px;
  }
`;

export const PuzzlesSidebar = styled.div`
  position: absolute;
  padding-left: ${spacing(4)};
  right: 0;
  z-index: 1;

  @media (min-width: ${breakpoints.wide}px) {
    width: 19.8333%;
    padding-right: ${spacing(8)};
  }
  @media (min-width: ${breakpoints.huge}px) {
    width: 18.8333%;
    padding-right: ${spacing(10)};
  }
`;
