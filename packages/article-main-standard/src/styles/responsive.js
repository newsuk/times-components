import { TcView } from "@times-components/utils";
import styled from "styled-components";
import { breakpoints, colours, spacing } from "@times-components/ts-styleguide";
import ArticleLeadAsset from "@times-components/article-lead-asset";

export const MainContainer = styled(TcView)`
  @media (min-width: ${breakpoints.wide}px) {
    padding-top: ${spacing(4)};
    margin: 0 auto;
    display: block;
  }
`;

/* --- HeaderAd --- */
export const HeaderAdContainer = styled(TcView)`
  display: none;

  @media (min-width: ${breakpoints.medium}px) {
    display: flex;
    border-top-color: ${colours.functional.keyline};
    border-bottom-color: ${colours.functional.keyline};
    border-bottom-width: 1px;
    padding-top: ${spacing(2)};
    padding-bottom: ${spacing(2)};
  }
`;

/* --- Header --- */

export const HeaderContainer = styled(TcView)`
  padding-left: ${spacing(2)};
  padding-right: ${spacing(2)};

  @media (min-width: ${breakpoints.medium}px) {
    order: 1;
    width: 80.8%;
    margin: 0 auto;
    padding-left: 0;
    padding-right: 0;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
    margin-bottom: ${spacing(3)};
  }
`;

/* --- Meta --- */

export const MetaContainer = styled(TcView)`
  margin-bottom: ${spacing(4)};
  padding-right: ${spacing(4)};
  padding-left: ${spacing(4)};
  position: absolute;
  left: 0;
  width: 20.8333%;
  z-index: 1;
  top: 100%;
  display: none;

  @media (min-width: ${breakpoints.wide}px) {
    display: block;
  }
`;

export const ArticleMainStandardContainer = styled(TcView)`
  @media (min-width: ${breakpoints.wide}px) {
    .inline-meta {
      display: none;
    }
  }
`;

export const HeaderTopContainer = styled.div`
  position: relative;
  order: 2;

  @media (min-width: ${breakpoints.wide}px) {
    order: 1;
  }
`;

export const LeadAsset = styled(ArticleLeadAsset)`
  margin-bottom: ${spacing(4)};
  order: 1;

  @media (min-width: ${breakpoints.medium}px) {
    margin-bottom: ${spacing(2)};
  }

  @media (min-width: ${breakpoints.wide}px) {
    order: 2;
    width: 56.2%;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const EmptyTeaserPadding = styled.div`
  padding-top: 10px;

  @media (min-width: ${breakpoints.wide}px) {
    padding-top: 0;
  }
`;
