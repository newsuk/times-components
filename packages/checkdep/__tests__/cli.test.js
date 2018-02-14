import main from "../main";
import simple from "./fixtures/simple.json";

describe("checkdep cli tests", () => {
  it("prints help", async () => {
    let logs = "";
    const log = (...args) => logs+=args.join(" ")+"\n";
    const argv = {help: true};
    await main({log, argv});
  });

  it("prints help", async () => {
    let logs = "";
    const log = (...args) => logs+=args.join(" ")+"\n";
    const argv = {help: true};
    await main({log, argv});
  });

  it("list all dependencies", async () => {
    let logs = "";
    let exitCode = 0;
    let exit = (code) => exitCode = code;
    const log = (...args) => logs+=args.join(" ")+"\n";
    const argv = {list: 1};
    const getPackages = () => simple;

    await main({log, argv, getPackages, exit});
    expect(exitCode).toBe(0);
  });

});
