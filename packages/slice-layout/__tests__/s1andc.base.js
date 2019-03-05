import React from "react";
import { iterator } from "@times-components/test-utils";
import { editionBreakpoints } from "@times-components/styleguide";
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
    },
    {
      name: "tablet - secondary one and columnist",
      test() {
        const output = renderComponent(
          <SecondaryOneAndColumnistSlice
            breakpoint={editionBreakpoints.medium}
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
