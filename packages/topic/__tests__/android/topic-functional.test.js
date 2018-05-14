import { mockReactNativeComponents } from "@times-components/jest-configurator";
import sharedFunctional from "../shared-functional";

describe("Topic functional tests on android", () => {
  mockReactNativeComponents("Text", "View");
  sharedFunctional();
});
