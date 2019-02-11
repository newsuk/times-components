import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { LeadTwoNoPicAndTwoSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "Two Lead Elements, Two Support Elements",
      test() {
        const output = renderComponent(
          <LeadTwoNoPicAndTwoSlice
            renderLead1={() => createItem("lead-1")}
            renderLead2={() => createItem("lead-2")}
            renderSupport1={() => createItem("support-1")}
            renderSupport2={() => createItem("support-2")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
