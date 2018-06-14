import domContextInit from "../../ad.stories-domcontext-init";
import { expectFunctionToBeSelfContained } from "../../fixtures/check-self-contained-function";

describe("DOMContext Stories", () => {
  it("uses a self-contained init function", () => {
    expectFunctionToBeSelfContained(domContextInit);
  });
});
