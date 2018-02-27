import chalk from "chalk";
import main from "../main";
import simple from "./fixtures/simple.json";
import divergent from "./fixtures/divergent.json";
import wrong from "./fixtures/wrong.json";
import wrongFixed from "./fixtures/wrong-fixed.json";

// unfortunately we cant test colours as the root yarn test disables colours
chalk.enabled = false;

describe("depend cli tests", () => {
  it("prints graph", async () => {
    const log = jest.fn();
    const argv = { graph: "*=>*" };
    const getPackages = () => simple;
    await main({ log, getPackages, argv });
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("list all dependencies", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { list: 1, expr: "*" };
    const getPackages = () => simple;

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("list with divergent", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { list: 1, expr: "*" };
    const getPackages = () => divergent;

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("list all rules", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { showRules: 1, expr: "*" };
    const getPackages = () => simple;

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("list all hints", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { hint: 1, expr: "*" };
    const getPackages = () => simple;

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("bail if wrong", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { bail: 1, expr: "*" };
    const getPackages = () => wrong;

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([[1]]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("throw exception on parse error", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { bail: 1, expr: "*" };
    const getPackages = () => ["", []];

    await main({ log, argv, getPackages, exit });
    expect(exit.mock.calls).toEqual([[1]]);
  });

  it("should fix wrong package.json", async () => {
    const exit = jest.fn();
    const getPackages = () => wrong;
    const writeJson = jest.fn();

    const log = jest.fn();
    const argv = { fix: true, expr: "*" };

    await main({ log, argv, getPackages, exit, writeJson });
    expect(exit.mock.calls).toEqual([]);
    expect(writeJson.mock.calls).toEqual(wrongFixed);
  });

  it("should get expr from lerna.json", async () => {
    const exit = jest.fn();
    const readJson = jest.fn(async () => ({ packages: ["./*"] }));
    const getPackages = jest.fn(() => simple);

    const log = jest.fn();
    const argv = { list: "", lerna: "project/root" };

    await main({ log, argv, getPackages, exit, readJson });
    expect(exit.mock.calls).toEqual([]);
    expect(readJson.mock.calls).toEqual([["project/root/lerna.json"]]);
    expect(getPackages.mock.calls).toEqual([["project/root/*/package.json"]]);
  });
});
