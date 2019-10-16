import { clean } from "../src/clean";

describe("clean", () => {
  it("should remove undefined props", () => {
    const props = {
      a: 1,
      b: 0,
      c: false,
      d: null,
      e: undefined,
      f: NaN
    };

    expect(clean(props)).toEqual({
      a: 1,
      b: 0,
      c: false,
      d: null
    });
  });

  it("should return empty object for undefined", () => {
    expect(clean(undefined)).toEqual({});
  });
});
