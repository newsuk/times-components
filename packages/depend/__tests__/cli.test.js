import chalk from "chalk";
import main from "../src/main";
import simple from "./fixtures/simple.json";
import divergent from "./fixtures/divergent.json";
import wrong from "./fixtures/wrong.json";
import wrongFixed from "./fixtures/wrong-fixed.json";

// unfortunately we cant test colours as the root yarn test disables colours
chalk.enabled = false;

describe("depend cli tests", () => {
  it("prints graph", async () => {
    const log = jest.fn();
    const argv = {
      expr: "package.json",
      graph: "*=>*"
    };
    const getPackages = () => simple;
    await main({
      argv,
      getPackages,
      log
    });
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("list all dependencies", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = {
      expr: "*",
      list: 1
    };
    const getPackages = () => simple;

    await main({
      argv,
      exit,
      getPackages,
      log
    });
    expect(exit.mock.calls).toEqual([]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("list with divergent", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = {
      expr: "*",
      list: 1
    };
    const getPackages = () => divergent;

    await main({
      argv,
      exit,
      getPackages,
      log
    });
    expect(exit.mock.calls).toEqual([]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("list all rules", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = {
      expr: "*",
      showRules: 1
    };
    const getPackages = () => simple;

    await main({
      argv,
      exit,
      getPackages,
      log
    });
    expect(exit.mock.calls).toEqual([]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("list all hints", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = {
      expr: "*",
      hint: 1
    };
    const getPackages = () => simple;

    await main({
      argv,
      exit,
      getPackages,
      log
    });
    expect(exit.mock.calls).toEqual([]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("bail if wrong", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { bail: 1, expr: "*" };
    const getPackages = () => wrong;

    await main({
      argv,
      exit,
      getPackages,
      log
    });
    expect(exit.mock.calls).toEqual([[1]]);
    expect(log.mock.calls).toMatchSnapshot();
  });

  it("throw exception on parse error", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = { bail: 1, expr: "*" };
    const getPackages = () => ["", []];

    await main({
      argv,
      exit,
      getPackages,
      log
    });
    expect(exit.mock.calls).toEqual([[1]]);
  });

  it("should fix wrong package.json", async () => {
    const exit = jest.fn();
    const getPackages = () => wrong;
    const writeJson = jest.fn();

    const log = jest.fn();
    const argv = {
      expr: "*",
      fix: true
    };

    await main({
      argv,
      exit,
      getPackages,
      log,
      writeJson
    });
    expect(exit.mock.calls).toEqual([]);
    expect(writeJson.mock.calls).toEqual(wrongFixed);
  });

  it("should get expr from lerna.json", async () => {
    const exit = jest.fn();
    const readJson = jest.fn(async () => ({ packages: ["./*"] }));
    const getPackages = jest.fn(() => simple);

    const log = jest.fn();
    const argv = {
      lerna: "project/root",
      list: ""
    };

    await main({
      argv,
      exit,
      getPackages,
      log,
      readJson
    });
    expect(exit.mock.calls).toEqual([]);
    expect(readJson.mock.calls).toEqual([["project/root/lerna.json"]]);
    expect(getPackages.mock.calls).toEqual([["project/root/*/package.json"]]);
  });

  it("should find lerna.json if neither -e or -l is used", async () => {
    const exit = jest.fn();
    const readJson = jest.fn(async () => ({ packages: ["./*"] }));
    const getPackages = jest.fn(() => simple);

    const log = jest.fn();
    const argv = { list: "" };
    await main({
      argv,
      exit,
      getPackages,
      log,
      readJson
    });
    expect(exit.mock.calls).toEqual([]);
    expect(readJson.mock.calls).toEqual([["lerna.json"]]);
    expect(getPackages.mock.calls).toEqual([["*/package.json"]]);
  });

  it("should forward error when reading lerna.json failed", async () => {
    const error = "lerna.json not found";
    const exit = jest.fn();
    const readJson = jest.fn(() => Promise.reject(error));
    const getPackages = jest.fn(() => simple);

    const log = jest.fn();
    const argv = { lerna: "." };
    await main({
      argv,
      exit,
      getPackages,
      log,
      readJson
    });
    expect(exit.mock.calls).toEqual([[1]]);
    expect(log.mock.calls).toEqual([[error]]);
  });

  it("restricts to only requested packages", async () => {
    const exit = jest.fn();
    const log = jest.fn();
    const argv = {
      expr: "*",
      list: 1,
      only: "{a,b}"
    };
    const getPackages = () => divergent;

    await main({
      argv,
      exit,
      getPackages,
      log
    });
    expect(exit.mock.calls).toEqual([]);
    expect(log.mock.calls).toMatchSnapshot();
  });
});
