/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import TapToLaunch from "../tap-to-launch";

const launchController = isLaunched =>
  isLaunched ? <div>Launched</div> : <div>Not Launched</div>;

it("renders correctly pre launch", () => {
  const root = renderer.create(
    <TapToLaunch>
      {launchController}
    </TapToLaunch>
  );

  const rootInstance = root.getInstance();

  expect(root.toJSON()).toMatchSnapshot();
});

it("launches correctly", () => {
  const root = renderer.create(
    <TapToLaunch>
      {launchController}
    </TapToLaunch>
  );

  const rootInstance = root.getInstance();

  rootInstance.launch();

  expect(root.toJSON()).toMatchSnapshot();
});
