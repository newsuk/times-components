import { makeGraphqlOptions } from "../connect";

describe("connect.js", () => {
  it("picks only required variables from the supplied props", () => {
    const options = makeGraphqlOptions(["a", "b"]);
    const props = { a: 1, b: 2, c: 3 };

    expect(options(props)).toEqual({ variables: { a: 1, b: 2 } });
  });

  it("prefers the debouncedProps object, if it exists", () => {
    const options = makeGraphqlOptions(["a", "b"]);
    const props = { a: 1, b: 2, c: 3, debouncedProps: { a: 10, b: 20, c: 30 } };

    expect(options(props)).toEqual({ variables: { a: 10, b: 20 } });
  });

  it("transforms props with the propsToVariables function", () => {
    const propsToVariables = ({ a, b }) => ({ A: a + 10, B: b + 10 });
    const options = makeGraphqlOptions(["A", "B"], propsToVariables);
    const props = { a: 1, b: 2, c: 3 };

    expect(options(props)).toEqual({ variables: { A: 11, B: 12 } });
  });
});
