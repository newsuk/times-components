import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { SecondaryOneAndFourSlice } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "four child elements",
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
    }
  ];

  iterator(tests);
};
