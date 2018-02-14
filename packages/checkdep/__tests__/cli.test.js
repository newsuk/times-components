import main from "../main";
import simple from "./fixtures/simple.json";
import wrong from "./fixtures/wrong.json";
import wrongFixed from "./fixtures/wrong-fixed.json";

describe("checkdep cli tests", () => {
  it("prints help", async () => {
    const log = jest.fn();
    const argv = { help: true };
    await main({ log, argv });
  });

  it("prints help", async () => {
    const log = jest.fn();
    const argv = { help: true };
    await main({ log, argv });
  });

  it("list all dependencies", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { list: 1, expr: "" };
    const getPackages = () => simple;

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([]);
  });

  it("list all rules", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { showRules: 1, expr: "*" };
    const getPackages = () => simple;

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([]);
  });

  it("list all hints", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { hint: 1, expr: "*" };
    const getPackages = () => simple;

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([]);
  });

  it("bail if wrong", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { bail: 1, expr: "*" };
    const getPackages = () => wrong;

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([[1]]);
  });

  it("throw exception on parse error", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { bail: 1, expr: "*" };
    const getPackages = () => ["", []];

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([[1]]);
  });

  it("throw exception if strategy not found", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { bail: 1, expr: "*", strategy: "foo" };
    const getPackages = () => ["", []];

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([[1]]);
  });

  it("should fix wrong package.json", async () => {
    const exit = jest.fn();
    const getPackages = () => wrong;
    const writeJson = jest.fn();

    const log = jest.fn();
    const argv = { fix: true , expr: "*" };
    console.log(log.mock.calls);

    await main({ log, argv, getPackages, exit, writeJson });
    expect(exit.mock.calls).toEqual([]);
    expect(writeJson.mock.calls).toEqual(wrongFixed);
  });
});
