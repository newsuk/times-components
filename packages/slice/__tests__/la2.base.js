import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { LeadAndTwoSlice } from "../src/slice";

export default renderComponent => {
  const tests = [
    {
      name: "a single child element",
      test() {
        const output = renderComponent(
          <LeadAndTwoSlice lead={() => createItem("lead")} />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "two child elements",
      test() {
        const output = renderComponent(
          <LeadAndTwoSlice
            lead={() => createItem("lead")}
            renderSupports={() => [createItem("support-1")]}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "three child elements",
      test() {
        const output = renderComponent(
          <LeadAndTwoSlice
            lead={() => createItem("lead")}
            renderSupports={() => [
              createItem("support-1"),
              createItem("support-2")
            ]}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
