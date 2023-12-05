/* eslint-env browser */
import React from "react";
import {
  addSerializers,
  enzymeTreeSerializer
} from "@times-components/jest-serializer";
import { mount } from "enzyme";
import { delay } from "@times-components/test-utils";
import InteractiveWrapper, {
  polyfillWCIfNecessary
} from "../../src/interactive-wrapper";

jest.mock("@times-components/image", () => ({
  __esModule: true,
  Placeholder: () => null
}));

addSerializers(expect, enzymeTreeSerializer());

describe("interactive-wrapper", () => {
  let container;
  let props;
  let polyfillPromise;

  async function waitForInserted() {
    await polyfillPromise;
    Array.from(document.querySelectorAll("link")).forEach(link =>
      link.onload()
    );
  }

  beforeEach(() => {
    jest.useFakeTimers();

    document.body.innerHTML = "";
    delete document.registerElement;
    delete HTMLLinkElement.prototype.import;

    container = document.createElement("div");

    document.body.appendChild(container);
    polyfillPromise = Promise.resolve(null);
    props = {
      attributes: {
        chaptercounter: "Chapter%20one",
        heading: "A heading",
        standfirst: "A standfirst"
      },
      element: "chapter-header",
      id: "a0534eee-682e-4955-8e1e-84b428ef1e79",
      source:
        "//components.timesdev.tools/lib2/times-chapter-header-1.0.0/chapter-header.html",
      fetchPolyfill: () => polyfillPromise
    };
  });

  afterEach(() => {
    document.body.innerHTML = "";
    delete document.registerElement;
    delete HTMLLinkElement.prototype.import;
  });

  describe("polyfillWCIfNecessary", () => {
    describe("support detection", () => {
      beforeEach(() => {
        HTMLLinkElement.prototype.import = true;
        document.registerElement = jest.fn();
      });

      it("does nothing if both html imports and custom elements are supported", () => {
        const { innerHTML } = document.body;

        expect(document.body.innerHTML).toEqual(innerHTML);
        return expect(polyfillWCIfNecessary()).resolves.toBe(undefined);
      });

      it("polyfills if html imports are not supported", () => {
        delete HTMLLinkElement.prototype.import;

        const promise = polyfillWCIfNecessary();
        window.dispatchEvent(new Event("WebComponentsReady"));
        document.body.querySelector("script").onload();

        expect(promise).not.toEqual(null);
      });

      it("polyfills if custom elements are not supported", () => {
        delete document.registerElement;

        const promise = polyfillWCIfNecessary();
        window.dispatchEvent(new Event("WebComponentsReady"));
        document.body.querySelector("script").onload();

        expect(promise).not.toEqual(null);
      });
    });

    it("waits for the script to load and the event to fire before resolving", async () => {
      let hasResolved = false;
      const promise = polyfillWCIfNecessary().then(() => {
        hasResolved = true;
      });

      jest.runAllTicks();
      expect(hasResolved).toEqual(false);

      document.body.querySelector("script").onload();

      jest.runAllTicks();
      expect(hasResolved).toEqual(false);

      window.dispatchEvent(new Event("WebComponentsReady"));

      jest.runAllTicks();

      await promise;

      expect(hasResolved).toEqual(true);
    });

    it("adds the polyfill to the page only once", async () => {
      const promise = Promise.all([
        polyfillWCIfNecessary(),
        polyfillWCIfNecessary()
      ]);

      window.dispatchEvent(new Event("WebComponentsReady"));
      document.body.querySelector("script").onload();

      await promise;

      const scripts = document.body.querySelectorAll("script");
      expect(scripts).toHaveLength(1);
      expect(scripts[0]).toMatchSnapshot();
    });
  });

  it("calls to fetch polyfill when mounting", () => {
    const fetchPolyfill = jest.fn(() => Promise.resolve());
    mount(<InteractiveWrapper {...props} fetchPolyfill={fetchPolyfill} />, {
      attachTo: container
    });

    expect(fetchPolyfill).toHaveBeenCalled();
  });

  it("renders the placeholder correctly", () => {
    const component = mount(<InteractiveWrapper {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("correctly inserts the link tag for the component only once", async () => {
    const component = mount(<InteractiveWrapper {...props} />);

    component.setProps({ attributes: { another: "attribute" } });

    await waitForInserted();

    const links = document.querySelectorAll("link");

    expect(links).toHaveLength(1);
    expect(links[0]).toMatchSnapshot();
  });

  it("renders correctly once polyfill is loaded", async () => {
    mount(<InteractiveWrapper {...props} />, {
      attachTo: container
    });

    await waitForInserted();

    expect(container).toMatchSnapshot();
  });

  it("re-shows the placeholder on re-render", async () => {
    const component = mount(<InteractiveWrapper {...props} />, {
      attachTo: container
    });

    await waitForInserted();

    component.setProps({
      source: "//components.timesdev.tools/new-element.html"
    });

    await polyfillPromise;

    expect(container).toMatchSnapshot();
  });

  it("updates the rendered interactive on update", async () => {
    const component = mount(<InteractiveWrapper {...props} />, {
      attachTo: container
    });

    await waitForInserted();

    component.setProps({
      attributes: {
        another: "attribute"
      },
      element: "another-component",
      id: "another-component",
      source:
        "//components.timesdev.tools/lib2/times-another-component-1.0.0/another-component.html"
    });

    await waitForInserted();

    expect(container).toMatchSnapshot();
  });

  it("ensure that the interactive is only ever inserted once", async () => {
    jest.useRealTimers();
    const component = mount(
      <InteractiveWrapper {...props} element="test-element" />,
      {
        attachTo: container
      }
    );

    await polyfillPromise;

    component.setProps({ element: "another-test-element" });

    document.querySelector("link").onload();
    await polyfillPromise;

    await delay(0);

    expect(container.querySelectorAll("another-test-element")).toHaveLength(1);
    expect(container.querySelectorAll("test-element")).toHaveLength(0);
  });
});
