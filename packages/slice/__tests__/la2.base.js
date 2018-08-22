import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { LeadOneAndTwoSlice } from "../src/slice";

export default renderComponent => {
  const tests = [
    {
      name: "a single child element",
      test() {
        const output = renderComponent(
          <LeadOneAndTwoSlice
            renderLead={() => createItem("lead")}
            renderSupport1={() => null}
            renderSupport2={() => null}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "two child elements",
      test() {
        const output = renderComponent(
          <LeadOneAndTwoSlice
            renderLead={() => createItem("lead")}
            renderSupport1={() => createItem("support-1")}
            renderSupport2={() => null}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "three child elements",
      test() {
        const output = renderComponent(
          <LeadOneAndTwoSlice
            renderLead={() => createItem("lead")}
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
