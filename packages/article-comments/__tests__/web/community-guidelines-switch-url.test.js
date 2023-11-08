import { getEnvironmentName } from "../../src/community-guidelines-url-switch";

describe("communityGuidelinesUrlSwitcher", () => {
  it("should find the environment from the window object", () => {
    window.__TIMES_CONFIG__ = {
      environmentName: "uat"
    }
    expect(getEnvironmentName()).toEqual("uat");
  });

  // it("should put uat in the url if the environment is UAT", () => {

  // });
  // it("should should add staging to the url if the environment is staging", () => {

  // });
})
