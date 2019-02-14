import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { PuzzleSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "puzzle",
      test() {
        const output = renderComponent(
          <PuzzleSlice
            renderBody={() => createItem("support-2")}
            renderHeader={() => createItem("support-1")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
