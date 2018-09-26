jest.mock("react-native", () => {
  const rn = require.requireActual("react-native");
  rn.NativeModules.ReactConfig = { timezone: "Europe/Kiev" };
  return rn;
});
