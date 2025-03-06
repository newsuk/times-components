import path from "path";
import jestConfigurator from "../src/jest-configurator";

const dir = path.resolve(__dirname, "../fixtures/all");

describe("Jest Configurator Web Tests", () => {
  it("should always use jsdom as the test environment", () => {
    const config = jestConfigurator(dir);
    expect(config.testEnvironment).toEqual("jsdom");
  });

  it("should have the correct module name extensions", () => {
    const config = jestConfigurator(dir);
    expect(config.moduleFileExtensions).toEqual([
      "js",
      "json",
      "ts",
      "tsx",
      "graphql"
    ]);
  });
});
