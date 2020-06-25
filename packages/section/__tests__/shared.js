/* eslint-disable global-require */
import React from "react";
import { MockEdition } from "@times-components-native/fixture-generator";
import { SectionContext } from "@times-components-native/context";
import { editionBreakpoints } from "@times-components-native/styleguide";
import {
  addSerializers,
  compose,
  flattenStyleTransform,
  minimaliseTransform,
  minimalNativeTransform,
  print
} from "@times-components-native/jest-serializer";
import TestRenderer from "react-test-renderer";
import SectionItemSeparator from "../src/section-item-separator";
import Section from "../src/section";
import PuzzleBar from "../src/puzzle-bar";

jest.mock("@times-components-native/edition-slices", () => {
  const slicesMock = {};
  const slicesMap = require.requireActual("@times-components-native/edition-slices")
    .default;

  Object.keys(slicesMap).forEach(key => {
    slicesMock[key] = slicesMap[key].name;
  });

  return {
    ...slicesMock,
    LeadOneAndTwoSlice: "LeadOneAndTwoSlice"
  };
});

jest.mock("@times-components-native/icons", () => ({
  IconForwardArrow: "IconForwardArrow"
}));
jest.mock("@times-components-native/image", () => ({
  __esModule: true,
  default: "TimesImage"
}));

export default () => {
  beforeEach(() => {
    jest.resetModules();
  });

  addSerializers(
    expect,
    compose(
      print,
      flattenStyleTransform,
      minimalNativeTransform,
      minimaliseTransform((value, key) => key !== "style")
    )
  );

  it("section page", () => {
    const edition = new MockEdition().get();

    expect(
      TestRenderer.create(
        <Section
          analyticsStream={() => {}}
          onArticlePress={() => {}}
          onPuzzleBarPress={() => {}}
          onPuzzlePress={() => {}}
          publicationName="TIMES"
          recentlyOpenedPuzzleCount={1}
          section={edition.sections[0]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("should render Secondary 2 No Pic and 2 instead of Secondary 2 and 2 for tablet", () => {
    const edition = new MockEdition().get();

    expect(
      TestRenderer.create(
        <Section
          analyticsStream={() => {}}
          onArticlePress={() => {}}
          onPuzzleBarPress={() => {}}
          onPuzzlePress={() => {}}
          publicationName="TIMES"
          recentlyOpenedPuzzleCount={1}
          section={edition.sections[5]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("should render secondary 2 and 2 for mobile (small breakpoint)", () => {
    jest.doMock("@times-components-native/utils", () => {
      const actualUtils = jest.requireActual("@times-components-native/utils");

      return {
        ...actualUtils,
        __esModule: true,
        getDimensions: jest.fn(() => ({
          height: 700,
          width: 250
        }))
      };
    });

    const SectionWithUpdatedDimensions = require("../src/section").default;

    const edition = new MockEdition().get();

    expect(
      TestRenderer.create(
        <SectionWithUpdatedDimensions
          analyticsStream={() => {}}
          onArticlePress={() => {}}
          onPuzzleBarPress={() => {}}
          onPuzzlePress={() => {}}
          publicationName="TIMES"
          recentlyOpenedPuzzleCount={1}
          section={edition.sections[5]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("puzzle bar with no puzzles", () => {
    expect(
      TestRenderer.create(
        <SectionContext.Provider value={{ recentlyOpenedPuzzleCount: 0 }}>
          <PuzzleBar onPress={() => {}} />
        </SectionContext.Provider>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("puzzle bar with one puzzle", () => {
    expect(
      TestRenderer.create(
        <SectionContext.Provider value={{ recentlyOpenedPuzzleCount: 1 }}>
          <PuzzleBar onPress={() => {}} />
        </SectionContext.Provider>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("puzzle bar with more than one puzzle", () => {
    expect(
      TestRenderer.create(
        <SectionContext.Provider value={{ recentlyOpenedPuzzleCount: 3 }}>
          <PuzzleBar onPress={() => {}} />
        </SectionContext.Provider>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("Times magazine section", () => {
    const edition = new MockEdition().get();

    expect(
      TestRenderer.create(
        <Section
          analyticsStream={() => {}}
          onArticlePress={() => {}}
          onPuzzleBarPress={() => {}}
          onPuzzlePress={() => {}}
          publicationName="TIMES"
          section={edition.sections[4]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("Sunday Times magazine section", () => {
    const edition = new MockEdition().get();

    expect(
      TestRenderer.create(
        <Section
          analyticsStream={() => {}}
          onArticlePress={() => {}}
          onPuzzleBarPress={() => {}}
          onPuzzlePress={() => {}}
          publicationName="SUNDAY TIMES"
          section={edition.sections[4]}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("section item separator - small", () => {
    expect(
      TestRenderer.create(
        <SectionItemSeparator breakpoint={editionBreakpoints.small} />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("section item separator - medium", () => {
    expect(
      TestRenderer.create(
        <SectionItemSeparator breakpoint={editionBreakpoints.medium} />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("section item separator - wide", () => {
    expect(
      TestRenderer.create(
        <SectionItemSeparator breakpoint={editionBreakpoints.wide} />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("section item separator - huge", () => {
    expect(
      TestRenderer.create(
        <SectionItemSeparator breakpoint={editionBreakpoints.huge} />
      ).toJSON()
    ).toMatchSnapshot();
  });
};
