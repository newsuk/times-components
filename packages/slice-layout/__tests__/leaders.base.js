import React from "react";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { Leaders } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "leaders - small",
      test() {
        const output = renderComponent(
          <Leaders
            breakpoint={editionBreakpoints.small}
            leader1={createItem("leader-1")}
            leader2={createItem("leader-2")}
            leader3={createItem("leader-3")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "leaders - medium",
      test() {
        const output = renderComponent(
          <Leaders
            breakpoint={editionBreakpoints.medium}
            leader1={createItem("leader-1")}
            leader2={createItem("leader-2")}
            leader3={createItem("leader-3")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "leaders - wide",
      test() {
        const output = renderComponent(
          <Leaders
            breakpoint={editionBreakpoints.wide}
            leader1={createItem("leader-1")}
            leader2={createItem("leader-2")}
            leader3={createItem("leader-3")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
