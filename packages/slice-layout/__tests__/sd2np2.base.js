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
            secondary1={createItem("secondary-1")}
            secondary2={createItem("secondary-2")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
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
            secondary1={createItem("secondary-1")}
            secondary2={createItem("secondary-2")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "secondary two no pic and two - wide",
      test() {
        const output = renderComponent(
          <SecondaryTwoNoPicAndTwoSlice
            breakpoint={editionBreakpoints.wide}
            secondary1={createItem("secondary-1")}
            secondary2={createItem("secondary-2")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "secondary two no pic and two - huge",
      test() {
        const output = renderComponent(
          <SecondaryTwoNoPicAndTwoSlice
            breakpoint={editionBreakpoints.huge}
            secondary1={createItem("secondary-1")}
            secondary2={createItem("secondary-2")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
