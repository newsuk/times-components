import {
  conservative,
  progressive,
  majority,
  majorityConservative,
  majorityProgressive
} from "../src/strategies";

describe("depend strategy tests", () => {
  it("should pick older version if strategy is conservative", async () => {
    const old = { version: "1.0.0" };
    const newer = { version: "2.0.0" };
    const picked = conservative(old, newer);
    expect(picked).toBe(-1);
    const picked2 = conservative(newer, old);
    expect(picked2).toBe(1);
  });

  it("should pick newer version if strategy is progressive", async () => {
    const old = { version: "1.0.0" };
    const newer = { version: "2.0.0" };
    const picked = progressive(old, newer);
    expect(picked).toBe(1);
    const picked2 = progressive(newer, old);
    expect(picked2).toBe(-1);
  });

  it("should pick version that is used by more packages if strategy is majority", async () => {
    const old = { version: "1.0.0", usedBy: [1, 2] };
    const newer = { version: "2.0.0", usedBy: [1] };
    const picked = majority(old, newer);
    expect(picked).toBe(-1);
    const picked2 = majority(newer, old);
    expect(picked2).toBe(1);
  });

  it("should pick version that is used by more packages if strategy is majorityConservative", async () => {
    const old = { version: "1.0.0", usedBy: [1, 2] };
    const newer = { version: "2.0.0", usedBy: [1, 2] };
    const picked = majorityConservative(old, newer);
    expect(picked).toBe(-1);
    const picked2 = majorityConservative(newer, old);
    expect(picked2).toBe(1);
  });

  it("should pick version that is used by more packages if strategy is majorityProgressive", async () => {
    const old = { version: "1.0.0", usedBy: [1, 2] };
    const newer = { version: "2.0.0", usedBy: [1, 2] };
    const picked = majorityProgressive(old, newer);
    expect(picked).toBe(1);
    const picked2 = majorityProgressive(newer, old);
    expect(picked2).toBe(-1);
  });
});
