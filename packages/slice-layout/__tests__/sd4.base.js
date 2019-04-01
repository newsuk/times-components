import React from "react";
import { editionBreakpoints } from "@times-components/styleguide";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { SecondaryFourSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "secondary four - small",
      test() {
        const output = renderComponent(
          <SecondaryFourSlice
            secondary1={createItem("secondary-1")}
            secondary2={createItem("secondary-2")}
            secondary3={createItem("secondary-3")}
            secondary4={createItem("secondary-4")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "secondary four - medium",
      test() {
        const output = renderComponent(
          <SecondaryFourSlice
            breakpoint={editionBreakpoints.medium}
            secondary1={createItem("secondary-1")}
            secondary2={createItem("secondary-2")}
            secondary3={createItem("secondary-3")}
            secondary4={createItem("secondary-4")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
