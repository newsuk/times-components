/* eslint-disable no-console */
import parser from "../cli-parser";

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
    const { strategy } = parser.parse(["depend", "/", "--strategy", "blub"]);
    expect(strategy).toEqual("blub");
  });

  it("should throw if no strategy provided", () => {
    expect(() => parser.parse(["depend", "path", "--strategy"])).toThrow();
    expect(console.error.mock.calls.length).toBeTruthy();
    expect(process.exit.mock.calls).toEqual([[1]]);
  });

  it("should get package", () => {
    const { pick } = parser.parse(["depend", "path", "--pick", "blub@blub"]);
    expect(pick).toEqual("blub@blub");
  });

  it("should throw if no package provided", () => {
    expect(() => parser.parse(["depend", "path", "--strategy"])).toThrow();
    expect(console.error.mock.calls.length).toBeTruthy();
    expect(process.exit.mock.calls).toEqual([[1]]);
  });
});
