import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { OpinionOneAndTwoSlice } from "../src/slice";

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
    }
  ];

  iterator(tests);
};
