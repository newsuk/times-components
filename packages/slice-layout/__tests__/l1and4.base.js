import React from "react";
import { iterator } from "@times-components/test-utils";
import { editionBreakpoints } from "@times-components/styleguide";
import createItem from "./utils";
import { LeadOneAndFourSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "lead one and four - small",
      test() {
        const output = renderComponent(
          <LeadOneAndFourSlice
            renderLead={() => createItem("lead")}
            renderSupport1={() => createItem("support-1")}
            renderSupport2={() => createItem("support-2")}
            renderSupport3={() => createItem("support-3")}
            renderSupport4={() => createItem("support-4")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "lead one and four - medium",
      test() {
        const output = renderComponent(
          <LeadOneAndFourSlice
            breakpoint={editionBreakpoints.medium}
            renderLead={() => createItem("lead")}
            renderSupport1={() => createItem("support-1")}
            renderSupport2={() => createItem("support-2")}
            renderSupport3={() => createItem("support-3")}
            renderSupport4={() => createItem("support-4")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
