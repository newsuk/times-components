import { applyPatch } from "../depend";

describe("depend apply-patch tests", () => {
  it("should have dependencies not defined if empty ", () => {
    const packageJson = {
      name: "foo",
      dependencies: {},
      devDependencies: {}
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
      name: "foo",
      dependencies: {
        x: "2.0.0",
        a: "42.0.0"
      },
      devDependencies: {
        y: "2.0.0"
      }
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
      name: "foo",
      dependencies: {
        x: "1.0.0",
        a: "42.0.0"
      },
      devDependencies: {
        y: "3.0.0"
      }
    });
  });
});
