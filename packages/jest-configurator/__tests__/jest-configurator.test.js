import jestConfigurator from "../src/jest-configurator";

describe("Jest Configurator Tests", () => {
  describe("All platforms", () => {
    it("should always use react-native preset", () => {
      const config = jestConfigurator("article", "android");
      expect(config.preset).toEqual("react-native");
    });

    it("should have a test match applying to the right directory based on params", () => {
      const config = jestConfigurator("article", "android");
      expect(config.testMatch).toContain(
        "<rootDir>/packages/article/__tests__/android/*.test.js"
      );
    });

    it("should ignore jest config", () => {
      const config = jestConfigurator("article", "android");
      expect(config.testPathIgnorePatterns).toContain(
        "<rootDir>/packages/article/__tests__/android/jest.config.js"
      );
    });

    it("should include times-components in transform ignore patterns", () => {
      const config = jestConfigurator("article", "android");
      expect(config.transformIgnorePatterns).toContain(
        "node_modules/(?!@times-components)/"
      );
    });

    it("should make sure the root directory will always be 4 folders back", () => {
      const config = jestConfigurator("article", "android");
      expect(config.rootDir).toEqual("../../../../");
    });

    it("should respect coverage ignore globs", () => {
      const config = jestConfigurator("jest-configurator", "android", [
        "lib",
        "flow-typed",
        "setup-jest.js"
      ]);
      expect(config.collectCoverageFrom).toEqual([
        "**/packages/jest-configurator/src/coverage.js",
        "**/packages/jest-configurator/src/jest-configurator.js"
      ]);
    });
  });

  // Web specific
  describe("Web specific configuration", () => {
    it("should use the module mapper to match react-native to react-native-web", () => {
      const config = jestConfigurator("article", "web");
      expect(config.moduleNameMapper["react-native"]).toEqual(
        "react-native-web"
      );
    });

    it("should always use jsdom as the test environment", () => {
      const config = jestConfigurator("article", "web");
      expect(config.testEnvironment).toEqual("jsdom");
    });

    it("should have the correct module name extensions", () => {
      const config = jestConfigurator("article", "web");
      expect(config.moduleFileExtensions).toEqual(["web.js", "js", "json"]);
    });
  });

  describe("Native specific configuration", () => {
    it("should have a default platform that matches the param in the haste", () => {
      const config = jestConfigurator("article", "ios");
      expect(config.haste.defaultPlatform).toEqual("ios");
    });

    it("should only define the param as the platform used", () => {
      const config = jestConfigurator("article", "ios");
      expect(config.haste.platforms).toEqual(["ios"]);
    });

    it("should use the correct module name extensions", () => {
      const config = jestConfigurator("article", "ios");
      expect(config.haste.moduleFileExtensions).toEqual([
        "ios.js",
        "native.js",
        "js",
        "json"
      ]);
    });
  });
});
