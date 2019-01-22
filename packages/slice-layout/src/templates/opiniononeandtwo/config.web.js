import { View } from "react-native";
import styled from "styled-components";
import { breakpoints, spacing } from "@times-components/styleguide";

const opinionSummaryConfig = {
  1: [125, 160],
  2: [125, 145, 225],
  3: [125, 160]
};

export const getOpinionConfig = ({ itemCount }) => ({
  bylineClass: "opinionBylineClass",
  contentContainerClass: "opinionContentContainerClass",
  headlineClass: "opinionHeadlineClass",
  imageConfig: {
    cropSize: "23",
    imageRatio: 308 / 502
  },
  imageContainerClass: "opinionImageContainerClass",
  isOpinionByline: true,
  isReversed: true,
  summaryConfig: {
    lengths: opinionSummaryConfig[itemCount],
    type: "opinion"
  }
});

export const getSupportConfig = () => ({
  contentContainerClass: "supportContentContainerClass",
  imageContainerClass: "supportImageContainerClass",
  summaryClass: "supportSummaryClass"
});

export const getConfigWrapper = ({ supportCount }) => {
  let Base = styled(View)`
    .opinionContentContainerClass {
      min-height: 250px;
    }

    .opinionImageContainerClass {
      align-self: flex-end;
      bottom: -9px;
      min-width: 100px;
      position: absolute;
      right: 0;
    }

    .supportImageContainerClass {
      display: none;
    }

    .supportSummaryClass {
      display: none;
    }

    .summaryHidden {
      display: none;
    }

    .opinionSummary125Class {
      display: block;
      padding-right: ${spacing(4)};
      width: 60%;
    }

    @media (min-width: ${breakpoints.small}px) {
      .opinionContentContainerClass {
        min-height: 200px;
      }

      .opinionHeadlineClass {
        padding-right: ${spacing(6)};
        width: 80%;
      }
    }
  `;

  if (supportCount === 0) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.small}px) {
        .opinionImageContainerClass {
          min-width: 130px;
        }
      }
    `;
  } else {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.small}px) {
        .opinionImageContainerClass {
          min-width: 120px;
        }
      }
    `;
  }

  Base = styled(Base)`
    @media (min-width: ${breakpoints.medium}px) {
      .opinionBylineClass,
      .opinionHeadlineClass {
        font-size: 30px;
        line-height: 30px;
        width: 100%;
      }

      .opinionContentContainerClass {
        min-width: auto;
        padding-right: ${spacing(11)};
      }

      .opinionImageContainerClass {
        max-width: 167px;
        min-width: auto;
        position: relative;
      }

      .supportImageContainerClass {
        display: block;
      }
    }
  `;

  if (supportCount === 0) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        .opinionImageContainerClass {
          min-width: auto;
        }

        .opinionSummary125Class {
          display: none;
        }

        .opinionSummary160Class {
          display: block;
        }
      }
    `;
  } else if (supportCount === 1) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        .opinionImageContainerClass {
          min-width: 165px;
        }

        .opinionSummary125Class {
          display: none;
        }

        .opinionSummary145Class {
          display: block;
        }
      }
    `;
  } else {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.medium}px) {
        .opinionImageContainerClass {
          min-width: 152px;
        }

        .opinionSummary125Class {
          display: none;
        }

        .opinionSummary160Class {
          display: block;
        }
      }
    `;
  }

  if (supportCount === 1) {
    Base = styled(Base)`
      @media (min-width: ${breakpoints.wide}px) {
        .opinionSummary125Class,
        .opinionSummary145Class {
          display: none;
        }

        .opinionSummary225Class {
          display: block;
        }
      }
    `;
  }

  return Base;
};
