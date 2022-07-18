import path from "path";
import jestConfigurator from "../src/jest-configurator";

const dir = path.resolve(__dirname, "../fixtures/all");

describe("Jest Configurator Web Tests", () => {
  it("should always use jsdom as the test environment", () => {
    const config = jestConfigurator("web", dir);
    expect(config.testEnvironment).toEqual("jsdom");
  });

  it("should have the correct module name extensions", () => {
    const config = jestConfigurator("web", dir);
    expect(config.moduleFileExtensions).toEqual([
      "ts",
      "tsx",
      "graphql",
      "js",
      "json"
    ]);
  });
});
