import graph from "../graph";
import requirements from "./fixtures/requirements";

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
