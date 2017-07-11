/* eslint-env jest */

import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";

import Error from "../error";
import ErroringComponent from "./erroring";
import ChangingComponent from "./changing";

it("renders a simple component with no errors", () => {
  const tree = renderer
    .create(<Error><Text>Just a test</Text></Error>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders the errors from it's child", () => {
  const tree = renderer.create(<Error><ErroringComponent /></Error>).toJSON();

  expect(tree).toMatchSnapshot();
});

it("propagates error correctly", done => {
  renderer.create(
    <Error
      onError={err => {
        expect(err).toMatchObject({
          code: "[ERROR_CODE]",
          message: "[ERROR_MESSAGE]"
        });

        done();
      }}
    >
      <ErroringComponent />
    </Error>
  );
});

it("propagates change correctly", done => {
  renderer.create(
    <Error
      onChange={state => {
        expect(state).toMatchObject({
          state: "boiled"
        });

        done();
      }}
    >
      <ChangingComponent />
    </Error>
  );
});

it("does not have to have a change handler", () => {
  renderer.create(
    <Error>
      <ChangingComponent />
    </Error>
  );
});
