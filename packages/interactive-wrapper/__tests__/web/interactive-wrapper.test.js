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
} from "../../src/interactive-wrapper.web";

jest.mock("@times-components/image", () => ({
  __esModule: true,
  Placeholder: () => null
}));

addSerializers(expect, enzymeTreeSerializer());

describe("interactive-wrapper", () => {
  let container;
  let props;

  beforeEach(() => {
    document.body.innerHTML = "";
    delete document.registerElement;
    delete HTMLLinkElement.prototype.import;

    container = document.createElement("div");

    document.body.appendChild(container);
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
      fetchPolyfill: () => Promise.resolve(null)
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
        expect(polyfillWCIfNecessary()).toEqual(null);
        expect(document.body.innerHTML).toEqual(innerHTML);
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

      await delay(0);
      expect(hasResolved).toEqual(false);

      document.body.querySelector("script").onload();

      await delay(0);
      expect(hasResolved).toEqual(false);

      window.dispatchEvent(new Event("WebComponentsReady"));

      await delay(0);
      expect(hasResolved).toEqual(true);

      await promise;
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
    const fetchPolyfill = jest.fn();
    mount(<InteractiveWrapper {...props} fetchPolyfill={fetchPolyfill} />, {
      attachTo: container
    });

    expect(fetchPolyfill).toHaveBeenCalled();
  });

  it("propagates errors when fetching polyfill", async () => {
    const error = new Error("failed to fetch polyfill");
    const fetchPolyfill = () => Promise.reject(error);
    const component = mount(
      <InteractiveWrapper {...props} fetchPolyfill={fetchPolyfill} />
    );

    await expect(component.instance().componentDidMount()).rejects.toThrow(
      error
    );
  });

  it("renders the placeholder correctly", () => {
    const component = mount(<InteractiveWrapper {...props} />);

    expect(component).toMatchSnapshot();
  });

  it("correctly inserts the link tag for the component only once", async () => {
    const component = mount(<InteractiveWrapper {...props} />);

    await component.instance().componentDidMount();
    await component.instance().componentDidMount();

    const links = document.querySelectorAll("link");

    expect(links).toHaveLength(1);
    expect(links[0]).toMatchSnapshot();
  });

  it("renders correctly once polyfill is loaded", async () => {
    const component = mount(<InteractiveWrapper {...props} />, {
      attachTo: container
    });

    await component.instance().componentDidMount();

    expect(container).toMatchSnapshot();
  });

  it("re-shows the placeholder on re-render", async () => {
    const promise = Promise.resolve(null);

    const component = mount(
      <InteractiveWrapper {...props} fetchPolyfill={() => promise} />,
      { attachTo: container }
    );

    await component.instance().componentDidMount();

    component.instance().componentDidUpdate();

    await promise;

    expect(container).toMatchSnapshot();
  });

  it("updates the rendered interactive on update", async () => {
    const component = mount(<InteractiveWrapper {...props} />, {
      attachTo: container
    });

    await component.instance().componentDidMount();

    component.setProps({
      attributes: {
        another: "attribute"
      },
      element: "another-component",
      id: "another-component",
      source:
        "//components.timesdev.tools/lib2/times-another-component-1.0.0/another-component.html"
    });

    await component.instance().componentDidUpdate();

    expect(container).toMatchSnapshot();
  });
});
