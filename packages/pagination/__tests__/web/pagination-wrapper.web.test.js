/* eslint-env browser */

import React, { Component } from "react";
import { Text } from "react-native";
import TestRenderer from "react-test-renderer";
import shared from "../shared.web";
import withPageState from "../../src/pagination-wrapper";

shared(withPageState);

test("replaces history state when mounted", () => {
  const TestComponent = () => <Text>Hello world</Text>;
  const PageChanger = withPageState(TestComponent);

  const props = {
    page: 2
  };

  const pushState = jest.spyOn(window.history, "pushState");
  const replaceState = jest.spyOn(window.history, "replaceState");

  TestRenderer.create(<PageChanger {...props} />);

  expect(pushState).not.toHaveBeenCalled();
  expect(replaceState.mock.calls).toEqual([[{ page: 2 }, null, "?page=2"]]);

  window.history.pushState.mockClear();
  window.history.replaceState.mockClear();
});

test("adds history state when the page changes", () => {
  let onNext;
  class TestComponent extends Component {
    constructor(props) {
      super(props);

      // eslint-disable-next-line
      onNext = props.onNext;
    }

    render() {
      return null;
    }
  }

  const PageChanger = withPageState(TestComponent);

  const props = {
    page: 2
  };

  TestRenderer.create(<PageChanger {...props} />);

  const pushState = jest.spyOn(window.history, "pushState");
  const replaceState = jest.spyOn(window.history, "replaceState");

  onNext({ preventDefault() {} }, 3);

  expect(replaceState).toHaveBeenCalledTimes(1);
  expect(pushState.mock.calls).toEqual([[{ page: 3 }, null, "?page=3"]]);

  window.history.pushState.mockClear();
  window.history.replaceState.mockClear();
});

test("updates the page state when the history changes", () => {
  // eslint-disable-next-line
  const TestComponent = ({ page }) => <Text>{page}</Text>;
  const PageChanger = withPageState(TestComponent);

  const props = {
    page: 2
  };

  const testRenderer = TestRenderer.create(<PageChanger {...props} />);

  window.onpopstate({
    state: {
      page: 4
    }
  });

  expect(testRenderer).toMatchSnapshot();

  window.history.pushState.mockClear();
  window.history.replaceState.mockClear();
});

test("does not update the page state when the history changes without a page", () => {
  // eslint-disable-next-line
  const TestComponent = ({ page }) => <Text>{page}</Text>;
  const PageChanger = withPageState(TestComponent);

  const props = {
    page: 2
  };

  const testRenderer = TestRenderer.create(<PageChanger {...props} />);

  window.onpopstate({});

  expect(testRenderer).toMatchSnapshot();

  window.history.pushState.mockClear();
  window.history.replaceState.mockClear();
});

test("removes the onpopstate customisation when unmounted", () => {
  // eslint-disable-next-line
  const TestComponent = ({ page }) => <Text>{page}</Text>;
  const PageChanger = withPageState(TestComponent);

  const props = {
    page: 2
  };

  const testRenderer = TestRenderer.create(<PageChanger {...props} />);

  testRenderer.unmount();

  expect(window.onpopstate).toEqual(null);

  window.history.pushState.mockClear();
  window.history.replaceState.mockClear();
});
