import { mockReactNativeComponent } from "@times-components/jest-configurator";
import sharedFunctional from "../shared-functional";

describe("Topic functional tests on ios", () => {
  jest.mock("Text", () => mockReactNativeComponent("Text"));
  jest.mock("View", () => mockReactNativeComponent("View"));

  sharedFunctional();
});
