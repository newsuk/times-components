import graph from "../graph";

const requirements = [
  {
    package: { name: "x", version: "1.0.0" },
    requires: { name: "z", version: "1.0.0" }
  },
  {
    package: { name: "y", version: "1.0.0" },
    requires: { name: "z", version: "1.0.0" }
  }
];

describe("depend graph printer tests", () => {
  it("should handle empty filter", () => {
    const requirements = [];
    const filter = "";
    const dot = graph(requirements, filter);
    expect(dot).toMatchSnapshot();
  });

  it("should handle left filter", () => {
    const filter = "x=>*";
    const dot = graph(requirements, filter);
    expect(dot).toMatchSnapshot();
  });

  it("should handle right filter", () => {
    const filter = "*=>z";
    const dot = graph(requirements, filter);
    expect(dot).toMatchSnapshot();
  });
});
