import { applyStrategy } from "../src/depend";
import { progressive } from "../src/strategies";

describe("depend apply-strategy tests", () => {
  it("should not resolve conflicts if no strategy is provided", () => {
    const requirements = [
      {
        package: { name: "foo", version: "1.0.0" },
        requires: { name: "x", version: "1.0.0" }
      },
      {
        package: { name: "bar", version: "1.0.0" },
        requires: { name: "x", version: "2.0.0" }
      }
    ];

    const { resolved } = applyStrategy(requirements, null);
    expect(resolved).toEqual([]);
  });

  it("should resolve conflicts if strategy provided", () => {
    const requirements = [
      {
        package: { name: "foo", version: "1.0.0" },
        requires: { name: "x", version: "1.0.0" }
      },
      {
        package: { name: "bar", version: "1.0.0" },
        requires: { name: "x", version: "2.0.0" }
      }
    ];

    const { resolved } = applyStrategy(requirements, progressive);
    expect(resolved).toEqual([
      {
        name: "x",
        version: "2.0.0"
      }
    ]);
  });
});
