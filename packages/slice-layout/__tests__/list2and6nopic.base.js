import React from "react";
import { iterator } from "@times-components/test-utils";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import createItem from "./utils";
import { ListTwoAndSixNoPic } from "../src/slice-layout";
import styles from "../src/templates/listtwoandsixnopic/styles";

export default renderComponent => {
  const tests = [
    {
      name: "list two and six no pic - small",
      test() {
        const output = renderComponent(
          <ListTwoAndSixNoPic
            lead1={createItem("lead-1")}
            lead2={createItem("lead-2")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
            support3={createItem("support-3")}
            support4={createItem("support-4")}
            support5={createItem("support-5")}
            support6={createItem("support-6")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "list two and six no pic - medium",
      test() {
        const output = renderComponent(
          <ListTwoAndSixNoPic
            breakpoint={editionBreakpoints.medium}
            lead1={createItem("lead-1")}
            lead2={createItem("lead-2")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
            support3={createItem("support-3")}
            support4={createItem("support-4")}
            support5={createItem("support-5")}
            support6={createItem("support-6")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "list two and six no pic - wide",
      test() {
        const output = renderComponent(
          <ListTwoAndSixNoPic
            breakpoint={editionBreakpoints.wide}
            lead1={createItem("lead-1")}
            lead2={createItem("lead-2")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
            support3={createItem("support-3")}
            support4={createItem("support-4")}
            support5={createItem("support-5")}
            support6={createItem("support-6")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "list two and six no pic - huge",
      test() {
        const output = renderComponent(
          <ListTwoAndSixNoPic
            breakpoint={editionBreakpoints.huge}
            lead1={createItem("lead-1")}
            lead2={createItem("lead-2")}
            support1={createItem("support-1")}
            support2={createItem("support-2")}
            support3={createItem("support-3")}
            support4={createItem("support-4")}
            support5={createItem("support-5")}
            support6={createItem("support-6")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "list two and six no pic - wrong breakpoint",
      test() {
        expect(styles("wrong-breakpoint")).toEqual({});
      }
    }
  ];

  iterator(tests);
};
