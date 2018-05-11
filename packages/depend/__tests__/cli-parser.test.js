/* eslint-disable no-console */
import parser from "../src/cli-parser";

const { exit } = process;
const { error } = console;

describe("depend cli-parser tests", () => {
  beforeEach(() => {
    process.exit = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    process.exit = exit;
    console.error = error;
  });

  it("should get glob expr", () => {
    const { expr } = parser.parse(["depend", "path", "--expr", "*"]);
    expect(expr).toEqual("*");
  });

  it("should throw if no expr provided", () => {
    expect(() => parser.parse(["depend", "path", "--expr"])).toThrow();
    expect(console.error.mock.calls.length).toBeTruthy();
    expect(process.exit.mock.calls).toEqual([[1]]);
  });

  it("should get strategy", () => {
    const { strategy } = parser.parse([
      "depend",
      "/",
      "--strategy",
      "majority"
    ]);
    expect(strategy.name).toEqual("majority");
  });

  it("should exit if invalid strategy was provided", () => {
    parser.parse(["depend", "path", "--strategy", "blub"]);
    expect(console.error.mock.calls.length).toBeTruthy();
    expect(process.exit.mock.calls).toEqual([[1]]);
  });

  it("should get pick rule", () => {
    const { pick } = parser.parse(["depend", "path", "--pick", "blub@blub"]);
    expect(pick).toEqual({ blub: "blub" });
  });

  it("should fail if too many @ symbol are used", () => {
    parser.parse(["depend", "path", "--pick", "a@b@c@d"]);
    expect(console.error.mock.calls).toMatchSnapshot();
    expect(process.exit.mock.calls).toEqual([[1]]);
  });

  it("should support pick rules with namespaces", () => {
    const { pick } = parser.parse([
      "depend",
      "path",
      "--pick",
      "@foo/bar@1.0.0"
    ]);
    expect(pick).toEqual({ "@foo/bar": "1.0.0" });
  });

  it("should exit if invalid pick rule is provided", () => {
    parser.parse(["depend", "path", "--pick", "blub"]);
    expect(console.error.mock.calls.length).toBeTruthy();
    expect(process.exit.mock.calls).toEqual([[1]]);
  });

  it("should throw if no package provided", () => {
    expect(() => parser.parse(["depend", "path", "--strategy"])).toThrow();
    expect(console.error.mock.calls.length).toBeTruthy();
    expect(process.exit.mock.calls).toEqual([[1]]);
  });
});
