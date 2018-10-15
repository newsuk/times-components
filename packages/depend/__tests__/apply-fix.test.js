import { applyPatch } from "../src/depend";

describe("depend apply-patch tests", () => {
  it("should have dependencies not defined if empty ", () => {
    const packageJson = {
      dependencies: {},
      devDependencies: {},
      name: "foo"
    };

    const fix = {
      dependencies: {},
      devDependencies: {}
    };

    const fixed = applyPatch(packageJson, fix);
    expect(fixed.dependencies).toEqual(undefined);
    expect(fixed.devDependencies).toEqual(undefined);
  });

  it("should patch dependencies", () => {
    const packageJson = {
      dependencies: {
        a: "42.0.0",
        x: "2.0.0"
      },
      devDependencies: {
        y: "2.0.0"
      },
      name: "foo"
    };

    const fix = {
      dependencies: {
        x: "1.0.0"
      },
      devDependencies: {
        y: "3.0.0"
      }
    };

    const fixed = applyPatch(packageJson, fix);
    expect(fixed).toMatchObject({
      dependencies: {
        a: "42.0.0",
        x: "1.0.0"
      },
      devDependencies: {
        y: "3.0.0"
      },
      name: "foo"
    });
  });
});
