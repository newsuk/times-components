import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";

const summaryConfig = {
  1: [125],
  2: [125],
  3: [125, 145]
};

export const getConfig = ({ itemCount }) => ({
  contentContainerClass: "contentContainerClass",
  headlineClass: "headlineClass",
  imageContainerClass: "imageContainerClass",
  summaryConfig: {
    lengths: summaryConfig[itemCount]
  }
});

export const getConfigWrapper = ({ itemCount }) => {
  let Base = styled(View)`
    .imageContainerClass {
      display: ${itemCount >= 3 ? "none" : "block"};
    }

    .summaryHidden {
      display: none;
    }

    .summary125Class {
      display: block;
    }

    @media (min-width: ${breakpoints.medium}px) {
      .imageContainerClass {
        display: block;
      }

      .headlineClass {
        font-size: 30px;
        line-height: 30px;
      }
    }
  `;

  if (itemCount === 1) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        .imageContainerClass {
          flex: 1;
          margin-bottom: 0;
          min-width: auto;
          padding-right: ${spacing(2)};
        }

        .contentContainerClass {
          flex-basis: 0 !important;
          flex-grow: 1;
          min-width: 300px;
        }
      }
    `;
  }

  Base = styled(Base)`
    @media (min-width: ${breakpoints.wide}px) {
      .summary125Class {
        display: ${itemCount === 3 ? "none" : "block"};
      }

      .summary145Class {
        display: ${itemCount === 3 ? "block" : "none"};
      }
    }
  `;

  return Base;
};
