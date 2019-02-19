import React from "react";
import { iterator } from "@times-components/test-utils";
import { editionBreakpoints } from "@times-components/styleguide";
import createItem from "./utils";
import { LeadOneAndOneSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "lead one and one",
      test() {
        const output = renderComponent(
          <LeadOneAndOneSlice
            renderLead={() => createItem("lead")}
            renderSupport={() => createItem("support")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "tablet - lead one and one",
      test() {
        const output = renderComponent(
          <LeadOneAndOneSlice
            breakpoint={editionBreakpoints.medium}
            renderLead={() => createItem("lead")}
            renderSupport={() => createItem("support")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
