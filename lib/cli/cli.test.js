/* eslint-env jest */

import path from "path";
import fs from "fs";
import rimraf from "rimraf";
import prettier from "prettier";
import cli from "./cli";

describe("./times-components CLI interface", () => {
  const originalProcessArgv = process.argv;

  beforeEach(() => {
    process.argv = originalProcessArgv.slice(0);
  });

  afterEach(() => {
    process.argv = originalProcessArgv;
  });

  const removeTestPackage = () => {
    rimraf.sync(
      path.resolve(__dirname, "../../packages/test-component-delete-me")
    );
  };

  beforeEach(removeTestPackage);

  afterEach(removeTestPackage);

  it("creates a package", () => {
    process.argv = [
      "/path/to/node",
      "/path/to/times-components",
      "create",
      "component",
      "TestComponentDeleteMe",
      "test component, delete me"
    ];

    cli();

    const read = file =>
      fs.readFileSync(
        path.resolve(
          __dirname,
          "../../packages/test-component-delete-me",
          file
        ),
        "utf-8"
      );

    expect(prettier.check(read("test-component-delete-me.js"))).toEqual(
      true,
      "prettier.check index file"
    );

    expect(prettier.check(read("test-component-delete-me.test.js"))).toEqual(
      true,
      "prettier.check test file"
    );

    expect(prettier.check(read("test-component-delete-me.stories.js"))).toEqual(
      true,
      "prettier.check stories file"
    );

    const pkgJson = JSON.parse(read("package.json"));

    expect(pkgJson.name).toEqual("@times-components/test-component-delete-me");

    expect(pkgJson.description).toEqual("test component, delete me");
  });
});
