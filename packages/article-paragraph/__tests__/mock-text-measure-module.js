jest.mock("react-native", () => {
  const rn = require.requireActual("react-native");
  rn.NativeModules.RNTextSize = {
    measure: () => Promise.resolve({ lineEnd: 99, width: 100 })
  };
  return rn;
});
