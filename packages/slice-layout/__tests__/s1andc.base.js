import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { SecondaryOneAndColumnistSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "secondary one and columnist",
      test() {
        const output = renderComponent(
          <SecondaryOneAndColumnistSlice
            renderColumnist={() => createItem("columnist")}
            renderSecondary={() => createItem("secondary")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
