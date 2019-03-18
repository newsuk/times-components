import React from "react";
import { iterator } from "@times-components/test-utils";
import { editionBreakpoints } from "@times-components/styleguide";
import createItem from "./utils";
import { SecondaryTwoNoPicAndTwoSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "secondary two no pic and two - small",
      test() {
        const output = renderComponent(
          <SecondaryTwoNoPicAndTwoSlice
            breakpoint={editionBreakpoints.small}
            renderSecondary1={() => createItem("secondary-1")}
            renderSecondary2={() => createItem("secondary-2")}
            renderSupport1={() => createItem("support-1")}
            renderSupport2={() => createItem("support-2")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "secondary two no pic and two - medium",
      test() {
        const output = renderComponent(
          <SecondaryTwoNoPicAndTwoSlice
            breakpoint={editionBreakpoints.medium}
            renderSecondary1={() => createItem("secondary-1")}
            renderSecondary2={() => createItem("secondary-2")}
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
