import { getAllRequirements } from "../checkdep";

describe("checkdep requirements tests", () => {
  it("should return no requirements if no dependencies available", () => {
    const packages = [{}, {}];

    const requirements = getAllRequirements(packages);
    expect(requirements).toEqual([]);
  });

  it("should return list of requirements for dependencies", () => {
    const packages = [
      {
        name: "foo",
        version: "2.0.0",
        dependencies: {
          x: "1.0.0",
          y: "3.0.0"
        }
      }
    ];

    const requirements = getAllRequirements(packages);
    expect(requirements).toEqual([
      ["foo", "2.0.0", "x", "1.0.0"],
      ["foo", "2.0.0", "y", "3.0.0"]
    ]);
  });

  it("should return list of requirements for devDependencies", () => {
    const packages = [
      {
        name: "foo",
        version: "2.0.0",
        devDependencies: {
          y: "1.0.0"
        }
      }
    ];

    const requirements = getAllRequirements(packages);
    expect(requirements).toEqual([["foo", "2.0.0", "y", "1.0.0"]]);
  });
});
