import shared from "../shared-with-style.web";

jest.mock("react-native", () => {
  let dims = { width: 480, height: 640, fontScale: 1.0 };
  const RN = jest.requireActual("react-native");
  return {
    ...RN,
    Dimensions: {
      get: () => dims,
      set: ({ window }) => {
        dims = window;
      },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }
  };
});

shared();
