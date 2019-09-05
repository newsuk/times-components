import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { OpinionOneAndTwoSlice } from "../src/slice-layout";
import {
  getSupportContainer,
  getSupportsContainer,
  getOpinionContainer,
  getSeparator,
  getContainer
} from "../src/templates/opiniononeandtwo/responsive.web";

export default renderComponent => {
  const tests = [
    {
      name: "a single child element",
      test() {
        const wrapper = renderComponent(
          <OpinionOneAndTwoSlice
            renderOpinion={() => createItem("opinion")}
            renderSupport1={() => null}
            renderSupport2={() => null}
          />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "two child elements",
      test() {
        const wrapper = renderComponent(
          <OpinionOneAndTwoSlice
            renderOpinion={() => createItem("opinion")}
            renderSupport1={() => createItem("support-1")}
            renderSupport2={() => null}
          />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "three child elements",
      test() {
        const wrapper = renderComponent(
          <OpinionOneAndTwoSlice
            renderOpinion={() => createItem("opinion")}
            renderSupport1={() => createItem("support-1")}
            renderSupport2={() => createItem("support-2")}
          />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "test getSupportContainer styles with supportCount 3 and index 1",
      test() {
        expect(
          getSupportContainer({ index: 1, supportCount: 3 })
        ).toMatchSnapshot();
      }
    },
    {
      name: "test getSupportContainer styles with supportCount 2 and index 1",
      test() {
        expect(
          getSupportContainer({ index: 1, supportCount: 2 })
        ).toMatchSnapshot();
      }
    },
    {
      name: "test getSupportContainer styles with supportCount 2 and index 0",
      test() {
        expect(
          getSupportContainer({ index: 0, supportCount: 2 })
        ).toMatchSnapshot();
      }
    },
    {
      name: "test getSupportContainer styles with supportCount 3 and index 0",
      test() {
        expect(
          getSupportContainer({ index: 0, supportCount: 3 })
        ).toMatchSnapshot();
      }
    },
    {
      name: "test getSupportsContainer styles with supportCount 2",
      test() {
        expect(getSupportsContainer({ supportCount: 2 })).toMatchSnapshot();
      }
    },
    {
      name: "test getSupportsContainer styles with supportCount 1",
      test() {
        expect(getSupportsContainer({ supportCount: 1 })).toMatchSnapshot();
      }
    },
    {
      name:
        "test getOpinionContainer styles with supportCount 1 and hasSupports",
      test() {
        expect(
          getOpinionContainer({ hasSupports: true, supportCount: 1 })
        ).toMatchSnapshot();
      }
    },
    {
      name:
        "test getOpinionContainer styles with supportCount 1 and hasSupports - false",
      test() {
        expect(
          getOpinionContainer({ hasSupports: false, supportCount: 1 })
        ).toMatchSnapshot();
      }
    },
    {
      name:
        "test getOpinionContainer styles with supportCount 2 and hasSupports",
      test() {
        expect(
          getOpinionContainer({ hasSupports: true, supportCount: 2 })
        ).toMatchSnapshot();
      }
    },
    {
      name:
        "test getOpinionContainer styles with supportCount 2 and hasSupports - false",
      test() {
        expect(
          getOpinionContainer({ hasSupports: false, supportCount: 2 })
        ).toMatchSnapshot();
      }
    },
    {
      name: "test getSeparator styles with itemCount 2",
      test() {
        expect(getSeparator({ itemCount: 2 })).toMatchSnapshot();
      }
    },
    {
      name: "test getSeparator styles with itemCount 3",
      test() {
        expect(getSeparator({ itemCount: 3 })).toMatchSnapshot();
      }
    },
    {
      name: "test getContainer styles with supportCount 1",
      test() {
        expect(getContainer({ supportCount: 1 })).toMatchSnapshot();
      }
    },
    {
      name: "test getContainer styles with supportCount 0",
      test() {
        expect(getContainer({ supportCount: 0 })).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
