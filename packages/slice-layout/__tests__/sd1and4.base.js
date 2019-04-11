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
            secondary={createItem("secondary-1")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
            support3={createItem("support-3")}
            support4={createItem("support-4")}
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
            secondary={createItem("secondary-1")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
            support3={createItem("support-3")}
            support4={createItem("support-4")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
