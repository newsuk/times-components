import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { CommentLeadAndCartoon } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "two child element",
      test() {
        const output = renderComponent(
          <CommentLeadAndCartoon
            renderCartoon={() => createItem("cartoon-1")}
            renderLead={() => createItem("lead-1")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
