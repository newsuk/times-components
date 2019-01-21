import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";

const leadSummaryConfig = {
  1: [125],
  2: [125],
  3: [125, 175]
};

export const getLeadConfig = ({ itemCount }) => ({
  contentContainerClass: "leadContentContainerClass",
  headlineClass: "leadHeadlineClass",
  imageContainerClass: "leadImageContainerClass",
  summaryConfig: {
    lengths: leadSummaryConfig[itemCount],
    type: "lead"
  }
});

export const getSupportConfig = () => ({
  contentContainerClass: "supportContentContainerClass",
  imageContainerClass: "supportImageContainerClass",
  summaryClass: "supportSummaryClass"
});

export const getConfigWrapper = ({ supportCount }) => {
  let Base = styled(View)`
    .supportImageContainerClass {
      display: none;
    }

    .supportSummaryClass {
      display: none;
    }

    .summaryHidden {
      display: none;
    }

    .leadSummary125Class {
      display: block;
    }

    @media (min-width: ${breakpoints.medium}px) {
      .leadHeadlineClass {
        font-size: 30px;
        line-height: 30px;
      }

      .leadImageContainerClass {
        flex: 1;
        margin-bottom: 0;
        min-width: auto;
      }

      .leadContentContainerClass {
        flex-basis: 0 !important;
        flex-grow: 1;
        margin-bottom: ${spacing(2)};
        min-width: 300px;
      }

      .supportImageContainerClass {
        display: block;
      }

      .leadSummary125Class {
        display: ${supportCount === 2 ? "none" : "block"};
      }

      .leadSummary175Class {
        display: ${supportCount === 2 ? "block" : "none"};
      }
    }
  `;

  if (supportCount === 2) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        .leadImageContainerClass {
          margin-bottom: ${spacing(2)};
          min-width: 370px;
        }
      }

      @media (min-width: ${breakpoints.wide}px) {
        .leadImageContainerClass {
          padding-right: ${spacing(2)};
          min-width: auto;
        }

        .supportImageContainerClass {
          flex: 1;
          margin-bottom: 0;
          max-width: 185px;
          min-width: auto;
          padding-right: ${spacing(2)};
        }

        .supportContentContainerClass {
          flex: 1;
          margin-bottom: 0;
          min-width: 100px;
        }
      }
    `;
  } else {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        .leadImageContainerClass {
          padding-right: ${spacing(2)};
        }
      }

      @media (min-width: ${breakpoints.wide}px) {
        .leadImageContainerClass {
          padding-right: ${spacing(2)};
        }
      }
    `;
  }

  return Base;
};
