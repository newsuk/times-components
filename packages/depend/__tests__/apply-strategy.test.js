import { applyStrategy } from "../depend";
import { progressive } from "../strategies";

describe("depend apply-strategy tests", () => {
  it("should not resolve conflicts if no strategy is provided", () => {
    const requirements = [
      ["foo", "1.0.0", "x", "1.0.0"],
      ["bar", "1.0.0", "x", "2.0.0"]
    ];

    const { resolved } = applyStrategy(requirements, null);
    expect(resolved).toEqual([]);
  });

  it("should resolve conflicts if strategy provided", () => {
    const requirements = [
      ["foo", "1.0.0", "x", "1.0.0"],
      ["bar", "1.0.0", "x", "2.0.0"]
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
