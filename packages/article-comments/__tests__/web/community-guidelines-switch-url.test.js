import { getEnvironmentName, changeCommunityGuidelinesUrl } from "../../src/community-guidelines-switch-url";

describe("communityGuidelinesUrlSwitcher", () => {
  it("should find the environment from the window object", () => {
    window.__TIMES_CONFIG__ = {
      environmentName: "uat"
    }
    expect(getEnvironmentName()).toEqual("uat");
  });

  it("should add uat- before thetimes in the URL if the environment is UAT", () => {
    window.__TIMES_CONFIG__ = {
      environmentName: "uat"
    }
    expect(changeCommunityGuidelinesUrl()).toEqual("https://www.uat-thetimes.co.uk/article/f4024fbe-d989-11e6-9063-500e6740fc32");
  });

  it("should should add staging- before thetimes in the url if the environment is staging", () => {
    window.__TIMES_CONFIG__ = {
      environmentName: "staging"
    }
    expect(changeCommunityGuidelinesUrl()).toEqual("https://www.staging-thetimes.co.uk/article/f4024fbe-d989-11e6-9063-500e6740fc32");
  });
})
