import React from "react";
import { setDimension } from "@times-components/mocks/dimensions";
import { View } from "react-native";
import { breakpoints } from "@times-components/styleguide";
import TestRenderer, { act } from "react-test-renderer";
import responsiveStyled, {
  mediaQuery
} from "../src/responsive-styled-components-native";
import { SCREEN_WIDTH_PROP } from "../src/shared";

export default () => {
  it("responsive has pre-wrapped View component", () => {
    expect(responsiveStyled.View``.displayName).toEqual(
      "ResponsiveStyled(View)"
    );
  });

  it("responsive has pre-wrapped Text component", () => {
    expect(responsiveStyled.Text``.displayName).toEqual(
      "ResponsiveStyled(Text)"
    );
  });

  it("can wrap custom components", () => {
    function Component() {
      return null;
    }

    Component.displayName = "MyComponent";

    expect(responsiveStyled(Component)``.displayName).toEqual(
      "ResponsiveStyled(MyComponent)"
    );
  });

  it("falls back to using name if display name not set", () => {
    function MyComponent() {
      return null;
    }

    expect(responsiveStyled(MyComponent)``.displayName).toEqual(
      "ResponsiveStyled(MyComponent)"
    );
  });

  it("responsive styled components pass the screen width to the prop matching functions", () => {
    setDimension({ width: 600 });

    let props = {};

    const Component = responsiveStyled.View`${p => {
      props = p;
    }}`;

    act(() => {
      TestRenderer.create(<Component />);
    });

    expect(props[SCREEN_WIDTH_PROP]).toEqual(600);
  });

  it("responsive styled components re-render when screen width changes", () => {
    setDimension({ width: 600 });

    let props = {};

    const Component = responsiveStyled.View`${p => {
      props = p;
    }}`;

    act(() => {
      TestRenderer.create(<Component />);
    });

    act(() => {
      setDimension({ width: 800 });
    });

    expect(props[SCREEN_WIDTH_PROP]).toEqual(800);
  });

  it("screen width is not passed to the wrapped component", () => {
    const Responsive = responsiveStyled.View``;

    const testRenderer = TestRenderer.create(<Responsive />);

    expect(
      testRenderer.root.findByType(View).props[SCREEN_WIDTH_PROP]
    ).not.toBeDefined();
  });

  it("props are passed through to the wrapped component", () => {
    const props = { foo: "bar", bar: "baz" };

    const Responsive = responsiveStyled.View``;

    const testRenderer = TestRenderer.create(<Responsive {...props} />);

    expect(testRenderer.root.findByType(View).props).toEqual(
      expect.objectContaining(props)
    );
  });

  it("passes a style prop through from styled components", () => {
    const Responsive = responsiveStyled.View``;

    const testRenderer = TestRenderer.create(<Responsive />);

    expect(testRenderer.root.findByType(View).props).toHaveProperty("style");
  });

  describe("mediaQuery", () => {
    it("using mediaQuery outside without a screen width throws", () => {
      expect(() => mediaQuery(() => true)``({})).toThrow(
        "Cannot use mediaQuery outside of @times-components/responsive-styled-components-native"
      );
    });

    it("returns the CSS if the passed matcher returns true", () => {
      const ifMatches = mediaQuery(() => true);
      const doesMatch = ifMatches`background-color:blue;`;

      expect(doesMatch({ [SCREEN_WIDTH_PROP]: 20 })).toEqual([
        "background-color:blue;"
      ]);
    });

    it("returns an empty string if the passed matcher returns false", () => {
      const ifMatches = mediaQuery(() => false);
      const doesMatch = ifMatches`background-color:blue;`;

      expect(doesMatch({ [SCREEN_WIDTH_PROP]: 20 })).toEqual("");
    });

    it("the matcher is called with the current screen width", () => {
      setDimension({ width: 400 });

      const matcher = jest.fn(() => true);
      const Responsive = responsiveStyled.View`${mediaQuery(matcher)``}`;
      act(() => {
        TestRenderer.create(<Responsive />);
      });

      expect(matcher).toHaveBeenCalledWith(400);
    });

    it("other props matchers are evaluated", () => {
      let props;

      const matcher = mediaQuery(() => true)`${p => {
        props = p;
      }}`;

      const Responsive = responsiveStyled.View`${matcher}`;

      act(() => {
        TestRenderer.create(<Responsive foo="bar" />);
      });

      expect(props).toEqual(expect.objectContaining({ foo: "bar" }));
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const breakpoint of Object.keys(breakpoints)) {
      it(`matchers for ${breakpoint} exists`, () => {
        expect(mediaQuery.maxWidth[breakpoint]).toBeDefined();
        expect(mediaQuery.minWidth[breakpoint]).toBeDefined();
      });
    }

    describe("minWidth", () => {
      it("matches if screen width is equal to provided width", () => {
        const matcher = mediaQuery.minWidth(500)`background-color: blue;`;

        expect(matcher({ [SCREEN_WIDTH_PROP]: 500 })).toEqual([
          "background-color: blue;"
        ]);
      });

      it("matches if screen width is more than provided width", () => {
        const matcher = mediaQuery.minWidth(500)`background-color: blue;`;

        expect(matcher({ [SCREEN_WIDTH_PROP]: 501 })).toEqual([
          "background-color: blue;"
        ]);
      });

      it("does not match if screen width is less than provided width", () => {
        const matcher = mediaQuery.minWidth(500)`background-color: blue;`;

        expect(matcher({ [SCREEN_WIDTH_PROP]: 499 })).toEqual("");
      });
    });

    describe("maxWidth", () => {
      it("matches if screen width is equal to provided width", () => {
        const matcher = mediaQuery.maxWidth(500)`background-color: blue;`;

        expect(matcher({ [SCREEN_WIDTH_PROP]: 500 })).toEqual([
          "background-color: blue;"
        ]);
      });

      it("matches if screen width is less than provided width", () => {
        const matcher = mediaQuery.maxWidth(500)`background-color: blue;`;

        expect(matcher({ [SCREEN_WIDTH_PROP]: 499 })).toEqual([
          "background-color: blue;"
        ]);
      });

      it("does not match if screen width is more than provided width", () => {
        const matcher = mediaQuery.maxWidth(500)`background-color: blue;`;

        expect(matcher({ [SCREEN_WIDTH_PROP]: 501 })).toEqual("");
      });
    });
  });
};
