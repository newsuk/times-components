import React from "react";
import renderer from "react-test-renderer";
import { addSerializers, rnw } from "@times-components/jest-serializer";

import AdPlaceholder from "../../src/ad-placeholder";

jest.mock("@times-components/watermark", () => () => "watermark");

describe("AdPlaceholder", () => {
  addSerializers(expect, rnw(["height", "width"]));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a tiny placeholder", () => {
    const tree = renderer
      .create(<AdPlaceholder width={100} height={100} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a small placeholder", () => {
    const tree = renderer
      .create(<AdPlaceholder width={300} height={300} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a medium placeholder", () => {
    const tree = renderer
      .create(<AdPlaceholder width={728} height={300} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a large placeholder", () => {
    const tree = renderer
      .create(<AdPlaceholder width={970} height={300} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
