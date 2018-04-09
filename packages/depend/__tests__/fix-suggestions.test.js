import { suggestFix } from "../src/depend";

describe("depend fix-suggestion tests", () => {
  it("should not suggest fixes no rules defined", () => {
    const packageJson = {
      dependencies: {
        a: "1.0.0"
      },
      devDependencies: {
        b: "1.0.0"
      }
    };

    const fix = suggestFix(packageJson, {});
    expect(fix).toEqual(null);
  });

  it("should suggest fixes for rules that match", () => {
    const packageJson = {
      dependencies: {
        a: "1.0.0",
        b: "1.0.0"
      },
      devDependencies: {
        c: "1.0.0",
        d: "1.0.0"
      }
    };

    const rules = {
      a: "2.0.0",
      c: "2.0.0"
    };

    const fix = suggestFix(packageJson, rules);
    expect(fix).toEqual({
      dependencies: { a: "2.0.0" },
      devDependencies: { c: "2.0.0" }
    });
  });
});
