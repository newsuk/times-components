import React from "react";
import { iterator } from "@times-components/test-utils";
import { View } from "react-native";
import createItem from "./utils";
import { VerticalLayout } from "../src/slice-layout";

export default renderComponent => {
  const tests = [
    {
      name: "no child elements",
      test() {
        const wrapper = renderComponent(<VerticalLayout tiles={[]} />);

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "a single child element",
      test() {
        const wrapper = renderComponent(
          <VerticalLayout tiles={[createItem("standard-1")]} />
        );

        expect(wrapper).toMatchSnapshot();
      }
    },
    {
      name: "ten child elements",
      test() {
        const wrapper = renderComponent(
          <VerticalLayout
            tiles={[
              <View tile={{ article: { id: "testId" } }} />,
              createItem("standard-1"),
              createItem("standard-2"),
              createItem("standard-3"),
              createItem("standard-4"),
              createItem("standard-5"),
              createItem("standard-6"),
              createItem("standard-7"),
              createItem("standard-8"),
              createItem("standard-9")
            ]}
          />
        );

        expect(wrapper).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
