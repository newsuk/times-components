import React from "react";
import { editionBreakpoints } from "@times-components/styleguide";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { CommentLeadAndCartoon } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "comment lead and cartoon - small",
      test() {
        const output = renderComponent(
          <CommentLeadAndCartoon
            cartoon={createItem("cartoon-1")}
            lead={createItem("lead-1")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "comment lead and cartoon - medium",
      test() {
        const output = renderComponent(
          <CommentLeadAndCartoon
            breakpoint={editionBreakpoints.medium}
            cartoon={createItem("cartoon-1")}
            lead={createItem("lead-1")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
