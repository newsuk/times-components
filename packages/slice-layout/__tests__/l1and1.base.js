import React from "react";
import { iterator } from "@times-components/test-utils";
import { editionBreakpoints } from "@times-components/styleguide";
import createItem from "./utils";
import { LeadOneAndOneSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "lead one and one - small",
      test() {
        const output = renderComponent(
          <LeadOneAndOneSlice
            lead={createItem("lead")}
            support={createItem("support")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "lead one and one - medium",
      test() {
        const output = renderComponent(
          <LeadOneAndOneSlice
            breakpoint={editionBreakpoints.medium}
            lead={createItem("lead")}
            support={createItem("support")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
