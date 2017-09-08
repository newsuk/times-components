/* eslint-env jest */

import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";

import ErrorView, { addErrorHandler } from "../error-view";
import ErroringComponent from "./erroring";
import ChangingComponent from "./changing";

it("renders an ErrorView", () => {
  const tree = renderer
    .create(<ErrorView errors={[{ code: "code", message: "message" }]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders a simple component with no errors", () => {
  const ErrorText = addErrorHandler(Text);
  const tree = renderer.create(<ErrorText>Just a test</ErrorText>).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders the errors from its child", () => {
  const WrappedErroringComponent = addErrorHandler(ErroringComponent);
  const tree = renderer.create(<WrappedErroringComponent />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("propagates error correctly", done => {
  const WrappedErroringComponent = addErrorHandler(ErroringComponent);

  renderer.create(
    <WrappedErroringComponent
      onError={err => {
        expect(err).toMatchObject({
          code: "[ERROR_CODE]",
          message: "[ERROR_MESSAGE]"
        });

        done();
      }}
    />
  );
});

it("propagates change correctly", done => {
  const WrappedChangingComponent = addErrorHandler(ChangingComponent);

  renderer.create(
    <WrappedChangingComponent
      onChange={state => {
        expect(state).toMatchObject({
          state: "boiled"
        });

        done();
      }}
    />
  );
});
