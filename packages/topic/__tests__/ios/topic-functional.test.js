import sharedFunctional from "../shared-functional";
import mockReactNativeComponents from "../react-native-mock-components";

describe("Topic functional tests on ios", () => {
  mockReactNativeComponents("Text", "View");
  sharedFunctional();
});
