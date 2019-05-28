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
  let eventMap;
  let realAddEventListener;
  let realRemoveEventListener;

  beforeEach(() => {
    realAddEventListener = window.addEventListener;
    realRemoveEventListener = window.removeEventListener;
    eventMap = {};

    window.addEventListener = jest.fn((eventName, callback) => {
      eventMap[eventName] = callback;
    });

    window.removeEventListener = jest.fn(eventName => {
      delete eventMap[eventName];
    });
  });

  afterEach(() => {
    window.addEventListener = realAddEventListener;
    window.removeEventListener = realRemoveEventListener;
  });

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

  it("removes events when unmounting", () => {
    const component = mount(<StickySaveAndShareBar />);
    component.unmount();

    expect(eventMap).toEqual({});
  });

  it("does not throw if scrolling before the ref is set", () => {
    const component = mount(<StickySaveAndShareBar />);

    component.instance().containerRef.current = null;
    eventMap.scroll();
    eventMap.resize();
  });

  it("becomes sticky when scrolling past it and unsticky when scrolling again", () => {
    const component = mount(<StickySaveAndShareBar />);
    const classList = { add: jest.fn(), remove: jest.fn() };
    const getBoundingClientRect = jest.fn();

    component.instance().containerRef.current = {
      getBoundingClientRect,
      classList
    };

    getBoundingClientRect.mockReturnValueOnce({ top: 0 });
    eventMap.scroll();

    expect(classList.add).toHaveBeenCalledWith("sticky");
    expect(classList.remove).not.toHaveBeenCalled();

    getBoundingClientRect.mockReturnValueOnce({ top: 5 });
    eventMap.scroll();

    expect(classList.remove).toHaveBeenCalledWith("sticky");
  });

  it("does not add the sticky class twice when scrolling", () => {
    const component = mount(<StickySaveAndShareBar />);
    const classList = { add: jest.fn(), remove: jest.fn() };
    const getBoundingClientRect = jest.fn();

    component.instance().containerRef.current = {
      getBoundingClientRect,
      classList
    };

    getBoundingClientRect.mockReturnValue({ top: 0 });
    eventMap.scroll();
    eventMap.scroll();

    expect(classList.add).toHaveBeenCalledTimes(1);
  });

  it("does not add the sticky class twice when resizing", () => {
    const component = mount(<StickySaveAndShareBar />);
    const classList = { add: jest.fn(), remove: jest.fn() };
    const getBoundingClientRect = jest.fn();

    component.instance().containerRef.current = {
      getBoundingClientRect,
      classList
    };

    getBoundingClientRect.mockReturnValue({ top: 0 });
    eventMap.scroll();
    eventMap.scroll();

    expect(classList.add).toHaveBeenCalledTimes(1);
  });

  it("becomes sticky when resizing so that the bar is now off screen", () => {
    const component = mount(<StickySaveAndShareBar />);
    const classList = { add: jest.fn(), remove: jest.fn() };
    const getBoundingClientRect = jest.fn();

    component.instance().containerRef.current = {
      getBoundingClientRect,
      classList
    };

    getBoundingClientRect.mockReturnValueOnce({ top: 0 });
    eventMap.resize();

    expect(classList.add).toHaveBeenCalledWith("sticky");
    expect(classList.remove).not.toHaveBeenCalled();

    getBoundingClientRect.mockReturnValueOnce({ top: 5 });
    eventMap.resize();

    expect(classList.remove).toHaveBeenCalledWith("sticky");
  });
});
