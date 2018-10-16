import { getAllRequirements } from "../src/depend";

describe("depend requirements tests", () => {
  it("should return no requirements if no dependencies available", () => {
    const packages = [{}, {}];

    const requirements = getAllRequirements(packages);
    expect(requirements).toEqual([]);
  });

  it("should return list of requirements for dependencies", () => {
    const packages = [
      {
        dependencies: {
          x: "1.0.0",
          y: "3.0.0"
        },
        name: "foo",
        version: "2.0.0"
      }
    ];

    const requirements = getAllRequirements(packages);
    expect(requirements).toEqual([
      {
        package: { name: "foo", version: "2.0.0" },
        requires: { name: "x", version: "1.0.0" }
      },
      {
        package: { name: "foo", version: "2.0.0" },
        requires: { name: "y", version: "3.0.0" }
      }
    ]);
  });

  it("should return list of requirements for devDependencies", () => {
    const packages = [
      {
        devDependencies: {
          y: "1.0.0"
        },
        name: "foo",
        version: "2.0.0"
      }
    ];

    const requirements = getAllRequirements(packages);
    expect(requirements).toEqual([
      {
        package: { name: "foo", version: "2.0.0" },
        requires: { name: "y", version: "1.0.0" }
      }
    ]);
  });
});
