/* eslint-disable react/no-multi-comp */
/* eslint-env jest, browser */
import React, { useState } from "react";
import styled from "styled-components";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";

import Sticky, {
  computeProgressStyles,
  selectors,
  StickyProvider,
  UnwrappedSticky
} from "../../src/sticky";

import "./js-dom-ext";

describe("Sticky", () => {
  let eventMap;
  let realAddEventListener;
  let realRemoveEventListener;
  let root;

  function scrollTo(offset) {
    window.pageYOffset = offset;
    eventMap.scroll();
  }

  function resize(offset = window.pageYOffset) {
    window.pageYOffset = offset;
    eventMap.resize();
  }

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

    function TestComponent() {
      const [unmounted, setUnmounted] = useState(false);
      unmount = () => setUnmounted(true);

      return (
        <StickyProvider>
          <div>{unmounted ? null : <Sticky />}</div>
        </StickyProvider>
      );
    }

    act(() => {
      render(<TestComponent />, root);
      unmount();
    });

    expect(eventMap).toEqual({});
  });

  it("cleans sticky node unmounting", () => {
    let unmount;

    function TestComponent() {
      const [unmounted, setUnmounted] = useState(false);
      unmount = () => setUnmounted(true);

      return (
        <StickyProvider>
          <div>{unmounted ? null : <Sticky />}</div>
        </StickyProvider>
      );
    }

    act(() => {
      render(<TestComponent />, root);
      scrollTo(9);
      unmount();
    });

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

    scrollTo(10);
    expect(document.body).toMatchSnapshot();
    scrollTo(9);
    expect(document.body).toMatchSnapshot();
  });

  it("remains sticky when continuing scrolling", () => {
    render(
      <StickyProvider>
        <Sticky style={{ marginTop: 10, height: 60 }} />
      </StickyProvider>,
      root
    );

    scrollTo(10);
    scrollTo(13);
    expect(document.body).toMatchSnapshot();
  });

  it("sticks with custom z-index", () => {
    render(
      <StickyProvider>
        <Sticky style={{ height: 60 }} zIndex="666" />
      </StickyProvider>,
      root
    );

    scrollTo(0);

    expect(
      document.body.querySelector("[data-tc-sticky-container]").style.zIndex
    ).toEqual("666");
  });

  it("sticks to the offset of the sticky provider", () => {
    root.style.marginTop = "30px";

    render(
      <StickyProvider>
        <Sticky style={{ height: 60 }} />
      </StickyProvider>,
      root
    );

    scrollTo(0);

    expect(
      document.body.querySelector("[data-tc-sticky-container]").style.top
    ).toEqual("30px");
  });

  it("is moved to the correct level in the tree when becoming sticky", () => {
    const TestComponent = React.forwardRef(({ children, ...props }, ref) => (
      <div id="sticky-provider-container" ref={ref} {...props}>
        {children}
      </div>
    ));

    render(
      <StickyProvider Component={TestComponent}>
        <Sticky />
      </StickyProvider>,
      root
    );

    scrollTo(0);
    expect(
      document.body.querySelector("[data-tc-sticky-container]").parentNode
    ).toEqual(document.querySelector("#sticky-provider-container"));
  });

  it("shouldBeSticky is checked when deciding whether to become sticky", () => {
    const shouldBeSticky = jest.fn(() => false);
    render(
      <StickyProvider>
        <Sticky shouldBeSticky={shouldBeSticky} />
      </StickyProvider>,
      root
    );

    scrollTo(0);

    expect(document.body).toMatchSnapshot();
    expect(shouldBeSticky).toHaveBeenCalled();
  });

  it("changes to the sticky context correctly update the position", () => {
    let change;

    function TestComponent() {
      const [top, setTop] = useState(30);
      change = () => setTop(50);

      return <UnwrappedSticky style={{ height: 60 }} stickyContext={{ top }} />;
    }

    act(() => {
      render(<TestComponent />, root);
      change();
      scrollTo(11);
    });

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

    scrollTo(10);

    const sizer = document.body.querySelector("[data-tc-sticky-sizer]");
    expect(sizer).toMatchSnapshot();
  });

  it("resizes the sizer on browser resize", () => {
    let change;

    function TestComponent() {
      const [{ width = 300, marginLeft = 30 }, set] = useState({});
      change = () => set({ width: 400, marginLeft: 60 });
      return (
        <StickyProvider>
          <div style={{ width, marginLeft }}>
            <Sticky />
          </div>
        </StickyProvider>
      );
    }

    act(() => {
      render(<TestComponent />, root);
      change();
      resize();
    });

    const sizer = document.body.querySelector("[data-tc-sticky-sizer]");
    expect(sizer.style.width).toEqual("400px");
    expect(sizer.style.marginLeft).toEqual("60px");
  });

  it("triggers the sticky detection on resize", () => {
    render(
      <UnwrappedSticky
        style={{ marginTop: 10, height: 60 }}
        stickyContext={{ top: 10 }}
      />,
      root
    );

    resize(10);
    expect(document.body).toMatchSnapshot();
  });

  describe("progress tracking", () => {
    it("before reaching component, there is no scroll progress attribute", () => {
      render(
        <StickyProvider>
          <Sticky style={{ marginTop: 1, height: 60 }} className="component" />
        </StickyProvider>,
        root
      );

      scrollTo(0);
      const component = document.querySelector(".component");
      expect(component.getAttributeNames()).not.toContain(
        "data-sticky-progress"
      );
    });

    it("at start of scroll, there is no scroll progress attribute", () => {
      root.style.marginTop = "10px";

      render(
        <StickyProvider>
          <Sticky
            style={{ marginTop: 15, height: 120 }}
            className="component"
          />
        </StickyProvider>,
        root
      );

      scrollTo(15);
      const component = document.querySelector(".component");
      expect(component.getAttributeNames()).not.toContain(
        "data-sticky-progress"
      );
    });

    it("applies scroll progress based on scroll progress through placeholder", () => {
      root.style.marginTop = "10px";

      render(
        <StickyProvider>
          <Sticky
            style={{ marginTop: 15, height: 120 }}
            className="component"
          />
        </StickyProvider>,
        root
      );

      scrollTo(75);
      const component = document.querySelector(".component");
      expect(component.getAttribute("data-sticky-progress")).toEqual("50");
    });

    it("at end of scroll, scroll progress is 100", () => {
      root.style.marginTop = "10px";

      render(
        <StickyProvider>
          <Sticky
            style={{ marginTop: 15, height: 120 }}
            className="component"
          />
        </StickyProvider>,
        root
      );

      scrollTo(135);
      const component = document.querySelector(".component");
      expect(component.getAttribute("data-sticky-progress")).toEqual("100");
    });

    it("scroll progress never goes above 100", () => {
      root.style.marginTop = "10px";

      render(
        <StickyProvider>
          <Sticky style={{ height: 30 }} className="component" />
        </StickyProvider>,
        root
      );

      scrollTo(999999);
      const component = document.querySelector(".component");
      expect(component.getAttribute("data-sticky-progress")).toEqual("100");
    });

    it("removes scroll progress once scrolling back above", () => {
      root.style.marginTop = "10px";

      render(
        <StickyProvider>
          <Sticky
            style={{ marginTop: 15, height: 120 }}
            className="component"
          />
        </StickyProvider>,
        root
      );

      scrollTo(140);

      scrollTo(0);

      const component = document.querySelector(".component");
      expect(component.getAttributeNames()).not.toContain(
        "data-sticky-progress"
      );
    });

    it("recalculates bounding box of placeholder during resize", () => {
      render(
        <UnwrappedSticky
          style={{ height: 60 }}
          className="component"
          stickyContext={{ top: 0 }}
        />,
        root
      );

      scrollTo(40);

      const spacer = document.createElement("div");
      spacer.style.height = "10px";

      root.insertBefore(spacer, root.firstChild);

      resize();

      const component = document.querySelector(".component");
      expect(component.getAttribute("data-sticky-progress")).toEqual("50");
    });

    it("computeProgressStyles correctly applies the style for the correct progress", () => {
      const TestComponent = styled.div`
        ${computeProgressStyles(progress => `opacity: ${progress}`)};
      `;

      render(
        <TestComponent data-sticky-progress="50" className="component" />,
        root
      );

      const component = document.body.querySelector(".component");
      expect(window.getComputedStyle(component)).toHaveProperty(
        "opacity",
        "0.5"
      );
    });
  });

  describe("selectors", () => {
    it("sticky selector applies styles to component when sticky", () => {
      const TestComponent = styled.div`
        height: 20px;
        color: black;

        ${selectors.sticky(`
          color: blue;
        `)};
      `;

      render(
        <StickyProvider>
          <Sticky Component={TestComponent} className="component" />
        </StickyProvider>,
        root
      );

      scrollTo(20);

      expect(
        window.getComputedStyle(document.body.querySelector(".component"))
      ).toHaveProperty("color", "blue");
    });

    it("sticky selector does not apply styles to component when not sticky", () => {
      const TestComponent = styled.div`
        margin-top: 10px;
        height: 20px;
        color: black;

        ${selectors.sticky(`
          color: blue;
        `)};
      `;

      render(
        <StickyProvider>
          <Sticky Component={TestComponent} className="component" />
        </StickyProvider>,
        root
      );

      scrollTo(0);

      expect(
        window.getComputedStyle(document.body.querySelector(".component"))
      ).toHaveProperty("color", "black");
    });

    it("contains sticky selector does not apply styles to container when not sticky", () => {
      const StickyContainer = styled.div`
        color: black;
        margin-top: 10px;

        ${selectors.containsSticky(`
          color: blue;
        `)};
      `;

      render(
        <StickyProvider>
          <StickyContainer className="sticky-container">
            <Sticky />
          </StickyContainer>
        </StickyProvider>,
        root
      );

      scrollTo(0);

      expect(
        window.getComputedStyle(
          document.body.querySelector(".sticky-container")
        )
      ).toHaveProperty("color", "black");
    });

    it("contains sticky selector does apply styles to container when sticky", () => {
      const StickyContainer = styled.div`
        color: black;
        margin-top: 10px;

        ${selectors.containsSticky(`
          color: blue;
        `)};
      `;

      render(
        <StickyProvider>
          <StickyContainer className="sticky-container">
            <Sticky />
          </StickyContainer>
        </StickyProvider>,
        root
      );

      scrollTo(10);

      expect(
        window.getComputedStyle(
          document.body.querySelector(".sticky-container")
        )
      ).toHaveProperty("color", "blue");
    });

    it("sizer selector correctly applies styles to the sizer", () => {
      const TestComponent = styled.div`
        height: 20px;

        ${selectors.sizer(`
          color: blue;
        `)};
      `;

      render(
        <StickyProvider>
          <Sticky Component={TestComponent} className="component" />
        </StickyProvider>,
        root
      );

      expect(
        window.getComputedStyle(
          document.body.querySelector("[data-tc-sticky-sizer]")
        )
      ).toHaveProperty("color", "blue");
    });

    it("sticky sizer selector correctly applies styles to the sizer when sticky", () => {
      const TestComponent = styled.div`
        height: 20px;

        ${selectors.stickySizer(`
          color: blue;
        `)};
      `;

      render(
        <StickyProvider>
          <Sticky Component={TestComponent} className="component" />
        </StickyProvider>,
        root
      );

      scrollTo(20);

      expect(
        window.getComputedStyle(
          document.body.querySelector("[data-tc-sticky-sizer]")
        )
      ).toHaveProperty("color", "blue");
    });

    it("sticky sizer selector does not apply styles to the sizer when not sticky", () => {
      const TestComponent = styled.div`
        height: 20px;
        margin-top: 10px;

        ${selectors.stickySizer(`
          color: blue;
        `)};
      `;

      render(
        <StickyProvider>
          <Sticky Component={TestComponent} className="component" />
        </StickyProvider>,
        root
      );

      scrollTo(0);

      expect(
        window.getComputedStyle(
          document.body.querySelector("[data-tc-sticky-sizer]")
        )
      ).not.toHaveProperty("color", "blue");
    });
  });
});
