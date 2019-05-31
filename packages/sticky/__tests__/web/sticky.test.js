/* eslint-disable no-undef */
import React from "react";
import { AppRegistry } from "react-native-web";
import { mount } from "enzyme";
import {
  addSerializers,
  compose,
  enzymeTreeSerializer,
  minimalWebTransform,
  print,
  rnwTransform
} from "@times-components/jest-serializer";

import Sticky, { UnwrappedSticky, StickyProvider } from "../../src/sticky";

addSerializers(
  expect,
  enzymeTreeSerializer(),
  compose(
    print,
    minimalWebTransform,
    rnwTransform(AppRegistry)
  )
);

describe("Sticky", () => {
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

    window.pageYOffset = 0;
  });

  afterEach(() => {
    window.addEventListener = realAddEventListener;
    window.removeEventListener = realRemoveEventListener;
  });

  it("renders with default props", () => {
    const component = mount(<UnwrappedSticky />);

    expect(component).toMatchSnapshot();
  });

  it("renders with custom props", () => {
    const component = mount(
      <UnwrappedSticky
        className="sticky-container"
        Component="span"
        zIndex={333}
        style={{ backgroundColor: "blue" }}
      >
        <div />
      </UnwrappedSticky>
    );

    expect(component).toMatchSnapshot();
  });

  it("removes events when unmounting", () => {
    const component = mount(
      <StickyProvider>
        <Sticky>
          <div />
        </Sticky>
      </StickyProvider>
    );
    component.unmount();

    expect(eventMap).toEqual({});
  });

  it("renders with sticky provider using default props", () => {
    window.pageYOffset = -19.9;
    const containerNode = { getBoundingClientRect: () => ({ top: 50 }) };

    const component = mount(
      <StickyProvider>
        <Sticky>
          <div />
        </Sticky>
      </StickyProvider>
    );

    component.instance().ref(containerNode);
    component.update();

    expect(component).toMatchSnapshot();
  });

  it("renders with sticky provider using custom props", () => {
    const containerNode = { getBoundingClientRect: () => ({ top: 40 }) };

    const component = mount(
      <StickyProvider Component="span" className="provider">
        <Sticky>
          <div />
        </Sticky>
      </StickyProvider>
    );

    component.instance().ref(containerNode);
    component.update();

    expect(component).toMatchSnapshot();
  });

  it("does not throw if scrolling before the ref is set", () => {
    const component = mount(
      <UnwrappedSticky>
        <div>Sticky</div>
      </UnwrappedSticky>
    );

    component.instance().containerRef.current = null;
    eventMap.scroll();
    eventMap.resize();
  });

  it("becomes sticky when scrolling past it and unsticky when scrolling again", () => {
    const component = mount(
      <UnwrappedSticky>
        <div />
      </UnwrappedSticky>
    );
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

  it("becomes sticky with custom sticky class when scrolling past it and unsticky when scrolling again", () => {
    const component = mount(
      <UnwrappedSticky stickyClassName="custom-sticky">
        <div />
      </UnwrappedSticky>
    );
    const classList = { add: jest.fn(), remove: jest.fn() };
    const getBoundingClientRect = jest.fn();

    component.instance().containerRef.current = {
      getBoundingClientRect,
      classList
    };

    getBoundingClientRect.mockReturnValueOnce({ top: 0 });
    eventMap.scroll();

    expect(classList.add).toHaveBeenCalledWith("custom-sticky");
    expect(classList.remove).not.toHaveBeenCalled();

    getBoundingClientRect.mockReturnValueOnce({ top: 5 });
    eventMap.scroll();

    expect(classList.remove).toHaveBeenCalledWith("custom-sticky");
  });

  it("when setting stickyContext it becomes sticky when scrolling past it and unsticky when scrolling again", () => {
    const component = mount(
      <UnwrappedSticky stickyContext={{ top: 5 }}>
        <div />
      </UnwrappedSticky>
    );
    const classList = { add: jest.fn(), remove: jest.fn() };
    const getBoundingClientRect = jest.fn();

    component.instance().containerRef.current = {
      getBoundingClientRect,
      classList
    };

    getBoundingClientRect.mockReturnValueOnce({ top: 7 });
    eventMap.scroll();

    expect(classList.add).not.toHaveBeenCalled();
    expect(classList.remove).not.toHaveBeenCalled();

    getBoundingClientRect.mockReturnValueOnce({ top: 6 });
    eventMap.scroll();

    expect(classList.add).toHaveBeenCalledWith("sticky");
    expect(classList.remove).not.toHaveBeenCalled();

    getBoundingClientRect.mockReturnValueOnce({ top: 7 });
    eventMap.scroll();

    expect(classList.remove).toHaveBeenCalledWith("sticky");
  });

  it("does not add the sticky class twice when scrolling", () => {
    const component = mount(<UnwrappedSticky />);
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
    const component = mount(<UnwrappedSticky />);
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
    const component = mount(<UnwrappedSticky />);
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
