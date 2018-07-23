import React from "react";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import Button from "../src/button";

export default renderMethod => {
  const tests = [
    {
      name: "button",
      test: () => {
        const output = renderMethod(
          <Button onPress={() => null} title="test button" />
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "should handle the onPress event",
      test: () => {
        const onPressMock = jest.fn();
        const wrapper = shallow(
          <Button onPress={onPressMock} title="test button" />
        );

        wrapper.simulate("press");

        expect(onPressMock).toHaveBeenCalled();
      }
    }
  ];

  iterator(tests);
};
