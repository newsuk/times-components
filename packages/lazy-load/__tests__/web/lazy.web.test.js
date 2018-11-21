import React from "react";
import { mount } from "enzyme";
import { iterator } from "@times-components/test-utils";
import {
  addSerializers,
  enzymeRenderedSerializer,
  minimalise
} from "@times-components/jest-serializer";
import LazyLoad from "../../src/lazy-load";

const delay = ms => new Promise(res => setTimeout(res, ms));

const omitProps = new Set(["class", "className", "style"]);

addSerializers(
  expect,
  enzymeRenderedSerializer(),
  minimalise((value, key) => omitProps.has(key))
);

const intersectionObserverInstances = [];
class FakeIntersectionObserver {
  constructor(cb) {
    this.instanceId = intersectionObserverInstances.length;
    intersectionObserverInstances.push({
      cb,
      nodes: new Set()
    });
  }

  observe(node) {
    Object.defineProperty(node, "clientWidth", {
      value: 600
    });
    intersectionObserverInstances[this.instanceId].nodes.add(node);
  }

  static dispatchEntriesForInstance(instanceId, makeEntries) {
    const instance = intersectionObserverInstances[instanceId];

    instance.cb(makeEntries(instance.nodes));
  }

  disconnect() {
    return this;
  }
}

afterEach(() => {
  delete window.IntersectionObserver;
  intersectionObserverInstances.splice(0);
});

const tests = [
  {
    name:
      "should render with an intersection observer using the expected options",
    test() {
      // IntersectionObserver is used twice by AuthorProfileContent, once for image
      // resizing and once for scroll tracking. We capture the opts passed so that
      // we can assert on them later.
      const optsSpy = jest.fn();
      window.IntersectionObserver = class {
        constructor(cb, opts) {
          optsSpy(opts);
        }

        observe() {} // eslint-disable-line class-methods-use-this
      };

      mount(
        <LazyLoad rootMargin="15px" threshold={0.7}>
          {() => null}
        </LazyLoad>
      );

      expect(optsSpy.mock.calls[0][0]).toMatchSnapshot();
    }
  },
  {
    name: "should render with an observed node if it's visible",
    async test() {
      window.IntersectionObserver = FakeIntersectionObserver;

      const list = ["node-1", "node-2", "node-3"];

      const component = mount(
        <LazyLoad rootMargin="15px" threshold={0.7}>
          {({ observed, registerNode }) => (
            <ul>
              {list.map(item => (
                <li id={item} key={item} ref={node => registerNode(node)}>
                  {JSON.stringify(!!observed.get(item))}
                </li>
              ))}
            </ul>
          )}
        </LazyLoad>
      );

      expect(component.find("#node-1").text()).toEqual("false");

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          intersectionRatio: indx === 0 ? 0.75 : 0,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(0, makeEntries);

      await delay(100);

      component.update();

      expect(component.find("#node-1").text()).toEqual("true");
    }
  },
  {
    name: "should render with an unobserved node if it is not visible",
    async test() {
      window.IntersectionObserver = FakeIntersectionObserver;

      const list = ["node-1", "node-2", "node-3"];

      const component = mount(
        <LazyLoad rootMargin="15px" threshold={0.7}>
          {({ observed, registerNode }) => (
            <ul>
              {list.map(item => (
                <li id={item} key={item} ref={node => registerNode(node)}>
                  {JSON.stringify(!!observed.get(item))}
                </li>
              ))}
            </ul>
          )}
        </LazyLoad>
      );

      expect(component.find("#node-2").text()).toEqual("false");

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          intersectionRatio: indx === 0 ? 0.75 : 0,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(0, makeEntries);

      await delay(100);

      component.update();

      expect(component.find("#node-2").text()).toEqual("false");
    }
  },
  {
    name:
      "should render with all nodes as observed if there is no IntersectionObserver",
    async test() {
      const list = ["node-1", "node-2", "node-3"];

      const component = mount(
        <LazyLoad rootMargin="15px" threshold={0.7}>
          {({ observed, registerNode }) => (
            <ul>
              {list.map(item => (
                <li id={item} key={item} ref={node => registerNode(node)}>
                  {JSON.stringify(!!observed.get(item))}
                </li>
              ))}
            </ul>
          )}
        </LazyLoad>
      );

      await delay(100);

      component.update();

      expect(component.find("#node-1").text()).toEqual("true");
      expect(component.find("#node-2").text()).toEqual("true");
      expect(component.find("#node-3").text()).toEqual("true");
    }
  },
  {
    name: "should not observe an item if it is scrolled past quickly",
    async test() {
      window.IntersectionObserver = FakeIntersectionObserver;

      const list = ["node-1", "node-2", "node-3"];

      const component = mount(
        <LazyLoad rootMargin="15px" threshold={0.7}>
          {({ observed, registerNode }) => (
            <ul>
              {list.map(item => (
                <li id={item} key={item} ref={node => registerNode(node)}>
                  {JSON.stringify(!!observed.get(item))}
                </li>
              ))}
            </ul>
          )}
        </LazyLoad>
      );

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          intersectionRatio: indx === 0 ? 0.75 : 0,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(0, makeEntries);

      await delay(20);

      const makeNewEntries = nodes =>
        [...nodes].map((node, indx) => ({
          intersectionRatio: indx === 0 ? 0.25 : 0.75,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(0, makeNewEntries);

      await delay(100);

      component.update();

      expect(component.find("#node-1").text()).toEqual("false");
      expect(component.find("#node-2").text()).toEqual("true");
      expect(component.find("#node-3").text()).toEqual("true");
    }
  },
  {
    name: "should observe no nodes if there are no pending items",
    async test() {
      window.IntersectionObserver = FakeIntersectionObserver;

      const list = ["node-1", "node-2", "node-3"];

      const component = mount(
        <LazyLoad rootMargin="15px" threshold={0.7}>
          {({ observed, registerNode }) => (
            <ul>
              {list.map(item => (
                <li id={item} key={item} ref={node => registerNode(node)}>
                  {JSON.stringify(!!observed.get(item))}
                </li>
              ))}
            </ul>
          )}
        </LazyLoad>
      );

      const makeEntries = nodes =>
        [...nodes].map(node => ({
          intersectionRatio: 0.75,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(0, makeEntries);

      await delay(20);

      const makeNewEntries = nodes =>
        [...nodes].map(node => ({
          intersectionRatio: 0,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(0, makeNewEntries);

      await delay(100);

      component.update();

      expect(component.find("#node-1").text()).toEqual("false");
      expect(component.find("#node-2").text()).toEqual("false");
      expect(component.find("#node-3").text()).toEqual("false");
    }
  },
  {
    name: "should not set state after unmounting",
    async test() {
      window.IntersectionObserver = FakeIntersectionObserver;

      const setStateSpy = jest.spyOn(LazyLoad.prototype, "setState");

      const list = ["node-1", "node-2", "node-3"];

      const component = mount(
        <LazyLoad rootMargin="15px" threshold={0.7}>
          {({ observed, registerNode }) => (
            <ul>
              {list.map(item => (
                <li id={item} key={item} ref={node => registerNode(node)}>
                  {JSON.stringify(!!observed.get(item))}
                </li>
              ))}
            </ul>
          )}
        </LazyLoad>
      );

      const makeEntries = nodes =>
        [...nodes].map((node, indx) => ({
          intersectionRatio: indx === 0 ? 0.75 : 0,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(0, makeEntries);

      await delay(20);

      const makeNewEntries = nodes =>
        [...nodes].map((node, indx) => ({
          intersectionRatio: indx === 0 ? 0.25 : 0.75,
          target: node
        }));

      window.IntersectionObserver.dispatchEntriesForInstance(0, makeNewEntries);

      await delay(0);

      component.unmount();

      await delay(100);

      expect(setStateSpy.mock.calls.length).toBe(1);

      setStateSpy.mockRestore();
    }
  },
  {
    name: "should disconnect from the IntersectionObserver when unmounting",
    async test() {
      window.IntersectionObserver = FakeIntersectionObserver;

      const disconnectSpy = jest.spyOn(
        window.IntersectionObserver.prototype,
        "disconnect"
      );

      const list = ["node-1", "node-2", "node-3"];

      const component = mount(
        <LazyLoad rootMargin="15px" threshold={0.7}>
          {({ observed, registerNode }) => (
            <ul>
              {list.map(item => (
                <li id={item} key={item} ref={node => registerNode(node)}>
                  {JSON.stringify(!!observed.get(item))}
                </li>
              ))}
            </ul>
          )}
        </LazyLoad>
      );

      component.unmount();

      expect(disconnectSpy).toHaveBeenCalled();

      disconnectSpy.mockRestore();
    }
  },
  {
    name: "should not throw when unmounting with no IntersectionObserver",
    async test() {
      delete window.IntersectionObserver;

      const list = ["node-1", "node-2", "node-3"];

      const component = mount(
        <LazyLoad rootMargin="15px" threshold={0.7}>
          {({ observed, registerNode }) => (
            <ul>
              {list.map(item => (
                <li id={item} key={item} ref={node => registerNode(node)}>
                  {JSON.stringify(!!observed.get(item))}
                </li>
              ))}
            </ul>
          )}
        </LazyLoad>
      );

      expect(component.unmount.bind(component)).not.toThrow();
    }
  }
];

iterator(tests);
