/* eslint-env jest */

import path from "path";
import fs from "fs";
import rimraf from "rimraf";
import prettier from "prettier";
import cli from "./cli";

const read = file =>
  fs.readFileSync(
    path.resolve(__dirname, "../../packages/test-component-delete-me", file),
    "utf-8"
  );

const removeTestPackage = () =>
  new Promise((res, rej) => {
    rimraf(
      path.resolve(__dirname, "../../packages/test-component-delete-me"),
      {},
      err => (err ? rej(err) : res())
    );
  });

describe("./times-components CLI interface", () => {
  const originalProcessArgv = process.argv;
  let pkgJson;

  beforeEach(() => {
    process.argv = originalProcessArgv.slice(0);
    process.argv = [
      "/path/to/node",
      "/path/to/times-components",
      "create",
      "component",
      "TestComponentDeleteMe",
      "test component, delete me"
    ];

    cli();

    pkgJson = JSON.parse(read("package.json"));
  });

  afterEach(done => {
    process.argv = originalProcessArgv;

    removeTestPackage().then(done);
  });

  describe("creates a package", () => {
    it("with a pretty index file", () => {
      expect(prettier.check(read("src/test-component-delete-me.js"))).toEqual(
        true
      );
    });

    it("with a pretty android test file", () => {
      expect(
        prettier.check(
          read("src/__tests__/android/test-component-delete-me.test.js")
        )
      ).toEqual(true);
    });

    it("with a pretty ios test file", () => {
      expect(
        prettier.check(
          read("src/__tests__/ios/test-component-delete-me.test.js")
        )
      ).toEqual(true);
    });

    it("with a pretty web test file", () => {
      expect(
        prettier.check(
          read("src/__tests__/web/test-component-delete-me.test.js")
        )
      ).toEqual(true);
    });

    it("with a pretty test eslint config file", () => {
      const eslintrcFile = JSON.parse(read("src/__tests__/.eslintrc.json"));
      expect(eslintrcFile.env.jest).toEqual(true);
    });

    it("with a pretty stories file", () => {
      expect(
        prettier.check(read("test-component-delete-me.stories.js"))
      ).toEqual(true);
    });

    it("with a package.json", () => {
      expect(pkgJson.name).toEqual(
        "@times-components/test-component-delete-me"
      );
    });

    it("with the expected description", () => {
      expect(pkgJson.description).toEqual("test component, delete me");
    });

    it("with a pretty styles shared file", () => {
      expect(prettier.check(read("src/styles/shared.js"))).toEqual(true);
    });

    it("with a pretty styles index file", () => {
      expect(prettier.check(read("src/styles/index.js"))).toEqual(true);
    });

    it("with a pretty styles ios file", () => {
      expect(prettier.check(read("src/styles/index.ios.js"))).toEqual(true);
    });

    it("with a pretty styles android file", () => {
      expect(prettier.check(read("src/styles/index.android.js"))).toEqual(true);
    });
  });
});
