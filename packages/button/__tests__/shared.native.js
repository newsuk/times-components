import React from "react";
import { shallow } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import Button from "../src/button";
import shared from "./shared.base";

export default () => {
  addSerializers(
    expect,
    enzymeTreeSerializer(),
    compose(
      print,
      minimaliseTransform((value, key) => key.startsWith("accessibility")),
      minimalNativeTransform,
      flattenStyleTransform
    )
  );

  it("should handle the onPress event", () => {
    const onPressMock = jest.fn();
    const wrapper = shallow(
      <Button onPress={onPressMock} title="test button" />
    );

    wrapper.simulate("press");

    expect(onPressMock).toHaveBeenCalled();
  });

  it("should render a Button with custon Text styles", () => {
    const textStyle = {
      color: "green",
      textTransform: "uppercase"
    };

    const wrapper = shallow(
      <Button
        title="something else"
        textStyle={textStyle}
        onPress={() => null}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  shared(shallow);
};
