import { mockReactNativeComponents } from "@times-components/jest-configurator";
import sharedFunctional from "../shared-functional";

describe("Topic functional tests on ios", () => {
  mockReactNativeComponents("Text", "View");
  sharedFunctional();
});
