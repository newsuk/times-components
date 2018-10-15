jest.mock("react-native", () => {
  const rn = require.requireActual("react-native");
  rn.NativeModules.RNTextSize = {
    measure: () => ({ then: () => ({ then: done => done({ lineEnd: 99 }) }) })
  };
  return rn;
});
