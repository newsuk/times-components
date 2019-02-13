import React from "react";
import { iterator } from "@times-components/test-utils";
import createItem from "./utils";
import { Leaders } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "three child element",
      test() {
        const output = renderComponent(
          <Leaders
            renderLeader1={() => createItem("leader-1")}
            renderLeader2={() => createItem("leader-2")}
            renderLeader3={() => createItem("leader-3")}
          />
        );

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
