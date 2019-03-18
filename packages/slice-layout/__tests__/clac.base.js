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
            renderCartoon={() => createItem("cartoon-1")}
            renderLead={() => createItem("lead-1")}
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
