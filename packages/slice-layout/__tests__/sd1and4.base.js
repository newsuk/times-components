import React from "react";
import { iterator } from "@times-components/test-utils";
import { editionBreakpoints } from "@times-components/styleguide";
import createItem from "./utils";
import { SecondaryOneAndFourSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "secondary one and four - small",
      test() {
        const output = renderComponent(
          <SecondaryOneAndFourSlice
            renderSecondary={() => createItem("secondary-1")}
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
      name: "secondary one and four - medium",
      test() {
        const output = renderComponent(
          <SecondaryOneAndFourSlice
            breakpoint={editionBreakpoints.medium}
            renderSecondary={() => createItem("secondary-1")}
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
