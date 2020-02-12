import trimCommasAndDashes from "../../src/utils";

describe("trimCommasAndDashes", () => {
  it("should remove trailing comma and trim spaces", () => {
    expect(trimCommasAndDashes(", Red Box Reporter")).toBe("Red Box Reporter");
  });
  it("should remove leading comma and trim spaces", () => {
    expect(trimCommasAndDashes("Red Box Reporter, ")).toBe("Red Box Reporter");
  });
  it("should remove leading comma, trailing pipe and trim spaces", () => {
    expect(trimCommasAndDashes(", Deputy Political Editor | ")).toBe(
      "Deputy Political Editor"
    );
  });
  it("should return empty string", () => {
    expect(trimCommasAndDashes(" | ")).toBe("");
  });
  it("shouldn't remove comma between inline text elements", () => {
    expect(trimCommasAndDashes("John Simpson, Crime Correspondent")).toBe(
      "John Simpson, Crime Correspondent"
    );
  });
});
