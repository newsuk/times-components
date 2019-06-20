import React from "react";
import { AppRegistry } from "react-native-web";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";
import StickySaveAndShareBar from "../../src/sticky-save-and-share-bar";

window.matchMedia = jest.fn(() => ({ matches: true }));

jest.mock("@times-components/save-and-share-bar", () => () =>
  "SaveAndShareBar"
);
jest.mock("@times-components/save-star-web", () => ({
  __esModule: true,
  saveApi: jest.fn()
}));

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform(),
    rnwTransform(AppRegistry)
  )
);

describe("StickySaveAndShareBar", () => {
  it("renders", () => {
    const component = mount(<StickySaveAndShareBar />);

    expect(component).toMatchSnapshot();
  });
});
