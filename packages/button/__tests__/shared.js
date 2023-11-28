import React from "react";
import { mount, shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  minimaliseTransform,
  minimalWebTransform,
  stylePrinter
} from "@times-components/jest-serializer";
import Button from "../src/button";
import shared from "./shared.base";

const accessibleAttributes = new Set(["aria-label", "role", "tabIndex"]);

export default () => {
  addSerializers(
    expect,
    enzymeRenderedSerializer(),
    compose(
      stylePrinter,
      minimalWebTransform,
      minimaliseTransform((value, key) => accessibleAttributes.has(key))
    )
  );

  it("should handle the onPress event", () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <Button onPress={onPressMock} title="test button" />
    );

    wrapper.simulate("click");

    expect(onPressMock).toHaveBeenCalled();
  });

  shared(mount);
};
