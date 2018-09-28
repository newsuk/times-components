/* eslint-env jest */

export default () => {
  jest.mock("react-native", () => {
    const rn = require.requireActual("react-native");
    rn.NativeModules.ReactConfig = { timezone: "Europe/London" };
    return rn;
  });
};
