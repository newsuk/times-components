import React from "react";
import TestRenderer from "react-test-renderer";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components/jest-serializer";
import UserState from "../src/user-state";

jest.mock("../src/client-user-state-consumer", () => ({ children }) =>
  children({ user: global.mockUserState })
);

addSerializers(
  expect,
  compose(
    print,
    minimalNativeTransform,
    minimaliseTransform((value, key) => key !== "style"),
    flattenStyleTransform
  )
);

describe("UserState", () => {
  afterEach(() => {
    delete global.mockUserState;
  });

  it("renders its children if matcher function returns true", () => {
    const testRenderer = TestRenderer.create(
      <UserState state={() => true}>
        <div>should render children</div>
      </UserState>
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("does not render its children if matcher function returns false", () => {
    const testRenderer = TestRenderer.create(
      <UserState state={() => false}>
        <div>should not render children</div>
      </UserState>
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("renders its fallback if matcher function returns false", () => {
    const testRenderer = TestRenderer.create(
      <UserState
        state={() => false}
        fallback={<div>should render fallback</div>}
      >
        <div>should not render children</div>
      </UserState>
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("does not renders its fallback if matcher function returns true", () => {
    const testRenderer = TestRenderer.create(
      <UserState
        state={() => true}
        fallback={<div>should not render fallback</div>}
      >
        <div>should render children</div>
      </UserState>
    );

    expect(testRenderer).toMatchSnapshot();
  });

  it("calls the matcher function with the user state", () => {
    global.mockUserState = { isLoggedIn: true };
    const matcher = jest.fn();

    TestRenderer.create(
      <UserState state={matcher}>
        <div />
      </UserState>
    );

    expect(matcher).toHaveBeenCalledWith(global.mockUserState);
  });
});
