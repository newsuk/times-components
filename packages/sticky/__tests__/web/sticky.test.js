/* eslint-disable react/no-multi-comp */
/* eslint-env jest, browser */
import React, { Component } from "react";
import { render } from "react-dom";
import Sticky, { StickyProvider, UnwrappedSticky } from "../../src/sticky";

import "./js-dom-ext";

// @todo Resize events
describe("Sticky", () => {
  let eventMap;
  let realAddEventListener;
  let realRemoveEventListener;
  let root;

  beforeEach(() => {
    document.body.innerHTML = "";

    root = document.createElement("div");
    root.id = "react-root";

    document.body.appendChild(root);

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
    render(
      <StickyProvider>
        <div style={{ width: 600, margin: "0 auto" }}>
          <Sticky style={{ marginTop: 10, marginBottom: 20, height: 60 }} />
        </div>
      </StickyProvider>,
      root
    );

    expect(document.body).toMatchSnapshot();
  });

  it("renders with custom props", () => {
    render(
      <StickyProvider Component="span">
        <div>
          <Sticky
            Component="span"
            className="test-class-name"
            zIndex="666"
            style={{ marginTop: 10, marginBottom: 20, height: 60 }}
          >
            children
          </Sticky>
        </div>
      </StickyProvider>,
      root
    );

    expect(document.body).toMatchSnapshot();
  });

  it("removes events when unmounting", () => {
    let unmount;

    class TestComponent extends Component {
      constructor() {
        super();
        this.state = { unmounted: false };
        unmount = () => this.setState({ unmounted: true });
      }

      render() {
        const { unmounted } = this.state;

        return (
          <StickyProvider>
            <div>
              {unmounted ? null : (
                <Sticky
                  style={{ marginTop: 10, marginBottom: 20, height: 60 }}
                />
              )}
            </div>
          </StickyProvider>
        );
      }
    }

    render(<TestComponent />, root);

    unmount();

    expect(eventMap).toEqual({});
  });

  it("cleans sticky node unmounting", () => {
    let unmount;

    class TestComponent extends Component {
      constructor() {
        super();
        this.state = { unmounted: false };
        unmount = () => this.setState({ unmounted: true });
      }

      render() {
        const { unmounted } = this.state;

        return (
          <StickyProvider>
            <div>
              {unmounted ? null : (
                <Sticky
                  style={{ marginTop: 10, marginBottom: 20, height: 60 }}
                />
              )}
            </div>
          </StickyProvider>
        );
      }
    }

    render(<TestComponent />, root);

    window.pageYOffset = 9;
    eventMap.scroll();

    unmount();

    expect(document.body).toMatchSnapshot();
  });

  it("becomes sticky and unsticky when scrolling past it", () => {
    render(
      <StickyProvider>
        <div style={{ width: 600, margin: "0 auto" }}>
          <Sticky style={{ marginTop: 10, marginBottom: 20, height: 60 }} />
        </div>
      </StickyProvider>,
      root
    );

    window.pageYOffset = 9;
    eventMap.scroll();
    expect(document.body).toMatchSnapshot();
    window.pageYOffset = 8;
    eventMap.scroll();
    expect(document.body).toMatchSnapshot();
  });

  it("remains sticky when continuing scrolling", () => {
    render(
      <StickyProvider>
        <div style={{ width: 600, margin: "0 auto" }}>
          <Sticky style={{ marginTop: 10, marginBottom: 20, height: 60 }} />
        </div>
      </StickyProvider>,
      root
    );

    window.pageYOffset = 9;
    eventMap.scroll();
    window.pageYOffset = 13;
    eventMap.scroll();
    expect(document.body).toMatchSnapshot();
  });

  it("sticks with custom z-index", () => {
    render(
      <StickyProvider>
        <div style={{ width: 600, margin: "0 auto" }}>
          <Sticky
            style={{ marginTop: 10, marginBottom: 20, height: 60 }}
            zIndex="666"
          />
        </div>
      </StickyProvider>,
      root
    );

    window.pageYOffset = 9;
    eventMap.scroll();

    expect(
      document.body.querySelector("[data-tc-sticky-container]").style.zIndex
    ).toEqual("666");
  });

  it("sticks to the offset of the sticky provider", () => {
    root.style.marginTop = "30px";

    render(
      <StickyProvider>
        <div style={{ width: 600, margin: "0 auto" }}>
          <Sticky style={{ marginTop: 10, marginBottom: 20, height: 60 }} />
        </div>
      </StickyProvider>,
      root
    );

    window.pageYOffset = 9;
    eventMap.scroll();
    expect(
      document.body.querySelector("[data-tc-sticky-container]").style.top
    ).toEqual("30px");
  });

  it("is moved to the correct level in the tree when becoming sticky", () => {
    render(
      <StickyProvider>
        <div style={{ width: 600, margin: "0 auto" }}>
          <Sticky style={{ marginTop: 10, marginBottom: 20, height: 60 }} />
        </div>
      </StickyProvider>,
      root
    );

    window.pageYOffset = 9;
    eventMap.scroll();
    expect(
      document.body.querySelector("[data-tc-sticky-container]").parentNode
    ).toEqual(document.body);
  });

  it("shouldBeSticky is checked when deciding whether to become sticky", () => {
    const shouldBeSticky = jest.fn(() => false);
    render(
      <StickyProvider>
        <div style={{ width: 600, margin: "0 auto" }}>
          <Sticky
            style={{ marginTop: 10, marginBottom: 20, height: 60 }}
            shouldBeSticky={shouldBeSticky}
          />
        </div>
      </StickyProvider>,
      root
    );

    window.pageYOffset = 9;
    eventMap.scroll();

    expect(document.body).toMatchSnapshot();
    expect(shouldBeSticky).toHaveBeenCalled();
  });

  it("changes to the sticky context correctly update the position", () => {
    let change;

    class TestComponent extends Component {
      constructor() {
        super();
        this.state = { top: 30 };
        change = () => this.setState({ top: 50 });
      }

      render() {
        const { top } = this.state;

        return (
          <UnwrappedSticky
            style={{ marginTop: 10, marginBottom: 20, height: 60 }}
            stickyContext={{ top }}
          />
        );
      }
    }

    render(<TestComponent />, root);

    change();

    window.pageYOffset = 9;
    eventMap.scroll();

    expect(
      document.body.querySelector("[data-tc-sticky-container]").style.top
    ).toEqual("50px");
  });

  it("correctly sets the sizer width and margin when sticky", () => {
    render(
      <StickyProvider>
        <div style={{ width: 800, marginLeft: 30 }}>
          <Sticky style={{ marginTop: 10, marginBottom: 20, height: 60 }} />
        </div>
      </StickyProvider>,
      root
    );

    window.pageYOffset = 9;
    eventMap.scroll();

    const sizer = document.body.querySelector("[data-tc-sticky-sizer]");

    expect(sizer).toMatchSnapshot();
  });

  it("resizes the sizer on browser resize", () => {
    let change;

    class TestComponent extends Component {
      constructor() {
        super();
        this.state = { width: 300, marginLeft: 30 };
        change = () => this.setState({ width: 400, marginLeft: 60 });
      }

      render() {
        const { width, marginLeft } = this.state;
        return (
          <StickyProvider>
            <div style={{ width, marginLeft }}>
              <Sticky />
            </div>
          </StickyProvider>
        );
      }
    }

    render(<TestComponent />, root);

    change();

    eventMap.resize();

    const sizer = document.body.querySelector("[data-tc-sticky-sizer]");
    expect(sizer.style.width).toEqual("400px");
    expect(sizer.style.marginLeft).toEqual("60px");
  });

  it("triggers the sticky detection on resize", () => {
    render(
      <UnwrappedSticky
        style={{ marginTop: 10, marginBottom: 20, height: 60 }}
        stickyContext={{ top: 10 }}
      />,
      root
    );

    window.pageYOffset = 10;
    eventMap.resize();
    expect(document.body).toMatchSnapshot();
  });
});
