import React from "react";
import { AppRegistry } from "react-native-web";
import { shallow, mount } from "enzyme";
import { saveApi } from "@times-components/save-star-web";
import SaveAndShareBar from "@times-components/save-and-share-bar";
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
  it("uses the passed savedApi if it is valid", () => {
    const passedSaveApi = { bookmark: jest.fn() };

    const component = shallow(
      <StickySaveAndShareBar saveApi={passedSaveApi} />
    );

    expect(component.find(SaveAndShareBar).prop("saveApi")).toEqual(
      passedSaveApi
    );
  });

  it("uses global savedApi if passed is not valid", () => {
    const component = shallow(<StickySaveAndShareBar saveApi={{}} />);

    expect(component.find(SaveAndShareBar).prop("saveApi")).toEqual(saveApi);
  });

  it("uses global savedApi if save api is not passed", () => {
    const component = shallow(<StickySaveAndShareBar />);

    expect(component.find(SaveAndShareBar).prop("saveApi")).toEqual(saveApi);
  });

  it("renders", () => {
    const component = mount(<StickySaveAndShareBar />);

    expect(component).toMatchSnapshot();
  });
});
