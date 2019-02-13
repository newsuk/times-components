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
  describe("with correct arguments", () => {
    let pkgJson;
    let readMeFile;

    beforeEach(() => {
      cli([
        "create",
        "component",
        "TestComponentDeleteMe",
        "test component, delete me"
      ]);

      pkgJson = JSON.parse(read("package.json"));
      readMeFile = read("README.md");
    });

    afterEach(done => {
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
            read("__tests__/android/test-component-delete-me.test.js")
          )
        ).toEqual(true);
      });

      it("with a pretty ios test file", () => {
        expect(
          prettier.check(read("__tests__/ios/test-component-delete-me.test.js"))
        ).toEqual(true);
      });

      it("with a pretty web test file", () => {
        expect(
          prettier.check(read("__tests__/web/test-component-delete-me.test.js"))
        ).toEqual(true);
      });

      it("with a pretty test eslint config file", () => {
        const eslintrcFile = JSON.parse(read("__tests__/.eslintrc.json"));
        expect(eslintrcFile.env.jest).toEqual(true);
      });

      it("with a pretty showcase file", () => {
        expect(
          prettier.check(read("test-component-delete-me.showcase.js"))
        ).toEqual(true);
      });

      it("with a pretty stories file", () => {
        expect(
          prettier.check(read("test-component-delete-me.stories.js"))
        ).toEqual(true);
      });

      it("with a README file", () => {
        expect(readMeFile.indexOf("TestComponentDeleteMe") > -1).toEqual(true);
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

      it("with a pretty styles web file", () => {
        expect(prettier.check(read("src/styles/index.web.js"))).toEqual(true);
      });

      it("with a pretty styles android file", () => {
        expect(prettier.check(read("src/styles/index.android.js"))).toEqual(
          true
        );
      });
    });
  });

  describe("without correct arguments", () => {
    let existingProcess;
    let existingConsole;
    let exit;
    const exitError = new Error("Process exit error");

    function assertExits(exitCode, handler) {
      try {
        handler();
      } catch (e) {
        if (e !== exitError) {
          throw e;
        }
      }

      expect(exit).toHaveBeenCalledWith(exitCode);
    }

    beforeEach(() => {
      existingProcess = global.process;
      existingConsole = global.console;

      exit = jest.fn(() => {
        throw exitError;
      });

      global.process = {
        ...global.process,
        exit
      };

      global.console = {
        log: () => null,
        error: () => null,
        warn: () => null
      };
    });

    afterEach(() => {
      global.process = existingProcess;
      global.console = existingConsole;
    });

    it("exits when component name is not passed", () => {
      assertExits(1, () => cli(["create", "component"]));
    });

    it("exits when component name is not CamelCase", () => {
      assertExits(1, () => cli(["create", "component", "not-camel Case"]));
    });

    it("exits when package description is not passed", () => {
      assertExits(1, () => cli(["create", "component", "Component"]));
    });

    it("exits when package description is empty", () => {
      assertExits(1, () => cli(["create", "component", "Component", ""]));
    });
  });
});
