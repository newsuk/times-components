import insertDropcapIntoAST from "../../src/dropcap-util";

const child = {
  attributes: [],
  children: [
    {
      attributes: {
        value:
          "As I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”"
      },
      children: [],
      name: "text"
    }
  ],
  name: "paragraph"
};

const childWithDropCap = {
  attributes: [],
  children: [
    {
      attributes: {
        value: "A"
      },
      children: [],
      name: "dropCap"
    },
    {
      attributes: {
        value:
          "s I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”"
      },
      children: [],
      name: "text"
    }
  ],
  name: "paragraph"
};

describe("insertDropcapIntoAST", () => {
  it("should insert dropcap if it belongs to the right template", () => {
    const template = "indepth";
    expect(insertDropcapIntoAST(child, template)).toEqual(childWithDropCap);
  });

  it("should NOT insert dropcap if it belongs to the wrong template", () => {
    const template = "mainstandard";
    expect(insertDropcapIntoAST(child, template)).toEqual(child);
  });

  it("should NOT insert dropcap if it belongs to the right template but disableDropcap is true", () => {
    const template = "indepth";
    const isDropcapDisabled = true;
    expect(insertDropcapIntoAST(child, template, isDropcapDisabled)).toEqual(
      child
    );
  });
});
