import React from "react";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { SecondaryTwoAndTwoSlice } from "../src/slice-layout";
import styles from "../src/templates/secondarytwoandtwo/styles";

export default renderComponent => {
  const tests = [
    {
      name: "secondary two and two - small",
      test() {
        const output = renderComponent(
          <SecondaryTwoAndTwoSlice
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
      name: "secondary two and two - medium",
      test() {
        const output = renderComponent(
          <SecondaryTwoAndTwoSlice
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
      name: "secondary two and two - wide",
      test() {
        const output = renderComponent(
          <SecondaryTwoAndTwoSlice
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
      name: "secondary two and two - huge",
      test() {
        const output = renderComponent(
          <SecondaryTwoAndTwoSlice
            breakpoint={editionBreakpoints.huge}
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
      name: "secondary two and two - wrong breakpoint",
      test() {
        expect(styles("wrong-breakpoint")).toEqual(
          styles(editionBreakpoints.small)
        );
      }
    }
  ];

  iterator(tests);
};
