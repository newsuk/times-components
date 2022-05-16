import React from "react";
import { editionBreakpoints } from "@times-components/ts-styleguide";
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
    },
    {
      name: "secondary four - medium - with isConsecutive",
      test() {
        const output = renderComponent(
          <SecondaryFourSlice
            breakpoint={editionBreakpoints.medium}
            isConsecutive
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
      name: "secondary four - wide",
      test() {
        const output = renderComponent(
          <SecondaryFourSlice
            breakpoint={editionBreakpoints.wide}
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
      name: "secondary four - wide - with isConsecutive",
      test() {
        const output = renderComponent(
          <SecondaryFourSlice
            isConsecutive
            breakpoint={editionBreakpoints.wide}
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
