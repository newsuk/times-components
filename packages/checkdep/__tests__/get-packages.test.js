import fs from "fs";
import getPackages from "../get-packages";

jest.mock("fs");

describe("checkdep getPackages tests", () => {
  it("should get mocked json files", async () => {
    fs.mockFs({
      "foo.json": "[1]",
      "bar.json": "[2]"
    });

    const [foo] = await getPackages("foo.json");
    const [bar] = await getPackages("bar.json");
    expect(foo).toEqual(["foo.json", [1]]);
    expect(bar).toEqual(["bar.json", [2]]);
  });

  it("should get mocked *.json", async () => {
    fs.mockFs({
      "foo.json": "[1]",
      "bar.json": "[2]"
    });

    const [bar, foo] = await getPackages("*.json");
    expect(foo).toEqual(["foo.json", [1]]);
    expect(bar).toEqual(["bar.json", [2]]);
  });

  it("should catch exception on parse", async () => {
    fs.mockFs({
      "error.json": "}{"
    });

    const error = await getPackages("error.json").catch(() => 1);
    expect(error).toBe(1);
  });

  it("should catch exception on glob", async () => {
    fs.mockFs(null);

    const error = await getPackages("error.json").catch(() => 1);
    expect(error).toBe(1);
  });
});
