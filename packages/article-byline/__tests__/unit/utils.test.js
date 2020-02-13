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
  it("should remove spaces and 'and' keyword", () => {
    expect(trimCommasAndDashes(" and ")).toBe("");
  });
  it("should remove 'and' + space", () => {
    expect(trimCommasAndDashes("and ")).toBe("");
  });
  it("should remove space + 'and'", () => {
    expect(trimCommasAndDashes(" and")).toBe("");
  });
  it("should remove 'and'", () => {
    expect(trimCommasAndDashes("and")).toBe("");
  });
  it("shouldn't modify if the name, title or location ends with 'and' and space", () => {
    expect(trimCommasAndDashes(" Georgi Mayand ")).toBe("Georgi Mayand");
  });
  it("shouldn't modify if the name, title or location ends with 'and'", () => {
    expect(trimCommasAndDashes("Georgi Mayand")).toBe("Georgi Mayand");
  });
  it("shouldn't modify if the name, title or location starts with 'and'", () => {
    expect(trimCommasAndDashes("andGeorgi")).toBe("andGeorgi");
  });
  it("should remove leading 'and' keyword", () => {
    expect(trimCommasAndDashes("   and Ben Chambers")).toBe("Ben Chambers");
  });
  it("should remove leading 'and' keyword and space", () => {
    expect(trimCommasAndDashes("and Ben Chambers")).toBe("Ben Chambers");
  });
  it("should remove trailing 'and' keyword and spaces", () => {
    expect(trimCommasAndDashes("Ben Chambers and     ")).toBe("Ben Chambers");
  });
  it("should remove trailing 'and' keyword", () => {
    expect(trimCommasAndDashes("Ben Chambers and")).toBe("Ben Chambers");
  });
  it("shouldn't modify 'and' in the middle", () => {
    expect(trimCommasAndDashes("Ben and Jerry")).toBe("Ben and Jerry");
  });
});
