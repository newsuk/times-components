import { mockReactNativeComponent } from "@times-components/jest-configurator";

import sharedFunctional from "../shared-functional";

describe("TopicHead functional tests on android", () => {
  jest.mock("Text", () => mockReactNativeComponent("Text"));
  jest.mock("View", () => mockReactNativeComponent("View"));

  sharedFunctional();
});

