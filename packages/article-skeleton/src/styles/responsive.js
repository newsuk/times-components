import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/styleguide";
import { ArticleKeylineItem } from "../keylines";

export const getHeaderAdStyles = template => {
  const hideKeylines = template === "indepth";

  return styled.div`
    box-sizing: content-box;
    justify-content: center;
    min-height: 50px;
    display: flex;
    border-bottom: ${hideKeylines ? "0" : "1px"} solid ${colours.functional.keyline};
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

export const MainContainer = styled.div`
  @media (min-width: ${breakpoints.wide}px) {
    padding-top: ${spacing(4)};
    margin: 0 auto;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  /* stylelint-disable */
  > ${ArticleKeylineItem} {
    order: 3;
  }
  /* stylelint-enable */
`;

export const BodyContainer = styled.div`
  display: block;
  order: 4;
`;
