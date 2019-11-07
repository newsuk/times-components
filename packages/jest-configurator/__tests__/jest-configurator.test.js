import path from "path";
import jestConfigurator from "../src/jest-configurator";

const dir = path.resolve(__dirname, "../fixtures/all");

describe("Jest Configurator Tests", () => {
  describe("All platforms", () => {
    it("should always use react-native preset", () => {
      const config = jestConfigurator("android", dir);
      expect(config.preset).toEqual("react-native");
    });

    it("should have a test match applying to the right directory based on params", () => {
      const config = jestConfigurator("android", dir);
      expect(config.testMatch).toContain(
        path.join(dir, "/__tests__/android/*.test.js")
      );
    });

    it("should ignore jest config", () => {
      const config = jestConfigurator("android", dir);
      expect(config.testPathIgnorePatterns).toContain(
        path.join(dir, "/__tests__/android/jest.config.js")
      );
    });

    it("should include times-components in transform ignore patterns", () => {
      const config = jestConfigurator("android", dir);
      expect(config.transformIgnorePatterns).toMatchSnapshot();
    });

    it("should make sure the root directory is correct", () => {
      const config = jestConfigurator("android", dir);
      expect(config.rootDir).toEqual(path.resolve(__dirname, ".."));
    });

    it("should respect coverage ignore globs", () => {
      const config = jestConfigurator(
        "android",
        path.resolve(__dirname, "../fixtures/ignore"),
        { coverageIgnoreGlobs: ["data-helper.js"] }
      );

      expect(config.coveragePathIgnorePatterns).toEqual(["data-helper.js"]);
    });
  });

  describe("Web specific configuration", () => {
    it("should use the module mapper to match react-native to react-native-web", () => {
      const config = jestConfigurator("web", dir);
      expect(config.moduleNameMapper["^react-native$"]).toEqual(
        "react-native-web"
      );
    });

    it("should always use jsdom as the test environment", () => {
      const config = jestConfigurator("web", dir);
      expect(config.testEnvironment).toEqual("jsdom");
    });

    it("should have the correct module name extensions", () => {
      const config = jestConfigurator("web", dir);
      expect(config.moduleFileExtensions).toEqual([
        "graphql",
        "web.js",
        "js",
        "json"
      ]);
    });
  });

  describe("Native specific configuration", () => {
    it("should have a default platform that matches the param in the haste", () => {
      const config = jestConfigurator("ios", dir);
      expect(config.haste.defaultPlatform).toEqual("ios");
    });

    it("should only define the param as the platform used", () => {
      const config = jestConfigurator("ios", dir);
      expect(config.haste.platforms).toEqual(["ios"]);
    });
  });

  describe("No platform specific config", () => {
    it("should allow a null platform value", () => {
      const config = jestConfigurator(null, dir);
      expect(config.moduleFileExtensions).toEqual(["js", "ts", "json"]);
    });

    it("should allow any other value to be platformless config", () => {
      const config = jestConfigurator(12345, dir);
      expect(config.moduleFileExtensions).toEqual(["js", "ts", "json"]);
    });
  });
});
