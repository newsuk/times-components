import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { OpinionAndTwoSlice } from "../src/slice";

export default renderComponent => {
  const tests = [
    {
      name: "a single child element",
      test() {
        const wrapper = renderComponent(
          <OpinionAndTwoSlice opinion={() => createItem("opinion")} />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "two child elements",
      test() {
        const wrapper = renderComponent(
          <OpinionAndTwoSlice
            opinion={() => createItem("opinion")}
            renderSupports={() => [createItem("support-1")]}
          />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "three child elements",
      test() {
        const wrapper = renderComponent(
          <OpinionAndTwoSlice
            opinion={() => createItem("opinion")}
            renderSupports={() => [
              createItem("support-1"),
              createItem("support-2")
            ]}
          />
        );

        expect(wrapper).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
