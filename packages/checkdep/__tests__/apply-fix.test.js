import { applyFix } from "../checkdep";

describe("checkdep applyFix tests", () => {
  it("should have dependencies not defined if empty ", () => {
    const packageJson = {
      name: "foo",
      dependencies: {}
    };

    const fix = {
      x: "1.0.0"
    };
    const fixed = applyFix(packageJson, fix);
    expect(fixed.dependencies).toEqual(undefined);
  });

  it("should fix dependencies", () => {
    const packageJson = {
      dependencies: {
        x: "2.0.0",
        a: "42.0.0"
      },
      devDependencies: {
        y: "2.0.0"
      }
    };

    const fix = {
      x: "1.0.0",
      y: "3.0.0"
    };

    const fixed = applyFix(packageJson, fix);
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
