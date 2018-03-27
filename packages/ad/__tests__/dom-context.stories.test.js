import React from "react";

import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

import domContextInit from "../ad.stories-domcontext-init";
import { expectFunctionToBeSelfContained } from "./check-self-contained-function";

describe("DOMContext Stories", () => {
  it("uses a self-contained init function", () => {
    expectFunctionToBeSelfContained(domContextInit);
  });
});
