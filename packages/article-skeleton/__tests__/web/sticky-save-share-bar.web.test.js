import React from "react";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimaliseTransform,
  minimalWebTransform,
  print
} from "@times-components/jest-serializer";

import "../mocks";

import { TCThemeProvider } from "@times-components/ts-newskit";
import StickySaveAndShareBar from "../../src/sticky-save-and-share-bar";

window.matchMedia = jest.fn(() => ({ matches: true }));

jest.mock("@times-components/save-and-share-bar", () => () =>
  "SaveAndShareBar"
);

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(
    print,
    minimalWebTransform,
    minimaliseTransform()
  )
);

describe("StickySaveAndShareBar", () => {
  it("renders", () => {
    const component = mount(
      <TCThemeProvider>
        <StickySaveAndShareBar />
      </TCThemeProvider>
    );

    expect(component).toMatchSnapshot();
  });
});
