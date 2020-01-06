import insertDropcapIntoAST from "../../src/dropcap-util";
import { isQuote } from "../../src/dropcap-util-common";

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

const childWithMarkup = {
  attributes: [],
  children: [
    {
      attributes: {},
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
      name: "link"
    }
  ],
  name: "paragraph"
};

const childWithDropCap = [
  {
    attributes: {},
    children: [
      {
        name: "dropCap",
        attributes: {},
        children: [
          {
            attributes: {
              value: "A",
              dropCap: true
            },
            children: [],
            name: "text"
          }
        ]
      },
      {
        attributes: {
          value:
            "s I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”",
          dropCap: true
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];

const childWithDropCapAndMarkup = [
  {
    attributes: [],
    children: [
      {
        name: "dropCap",
        attributes: {},
        children: [
          {
            attributes: {
              dropCap: true
            },
            children: [
              {
                attributes: {
                  value: "A",
                  dropCap: true
                },
                children: [],
                name: "text"
              }
            ],
            name: "link"
          }
        ]
      },
      {
        attributes: {
          dropCap: true
        },
        children: [
          {
            attributes: {
              value:
                "s I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”",
              dropCap: true
            },
            children: [],
            name: "text"
          }
        ],
        name: "link"
      }
    ],
    name: "paragraph"
  }
];

const childWithQuote = {
  attributes: [],
  children: [
    {
      attributes: {
        value:
          "'As I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”"
      },
      children: [],
      name: "text"
    }
  ],
  name: "paragraph"
};

const childWithQuoteDropCap = {
  attributes: {},
  children: [
    {
      name: "dropCap",
      attributes: {},
      children: [
        {
          attributes: {
            value: "'A",
            dropCap: true
          },
          children: [],
          name: "text"
        }
      ]
    },
    {
      attributes: {
        value:
          "s I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”",
        dropCap: true
      },
      children: [],
      name: "text"
    }
  ],
  name: "paragraph"
};

const childWithMarkupAndQuote = {
  attributes: [],
  children: [
    {
      attributes: {},
      children: [
        {
          attributes: {
            value:
              "'As I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”"
          },
          children: [],
          name: "text"
        }
      ],
      name: "link"
    }
  ],
  name: "paragraph"
};

const childWithDropCapAndMarkupAndQuote = {
  attributes: [],
  children: [
    {
      name: "dropCap",
      attributes: {},
      children: [
        {
          attributes: {
            dropCap: true
          },
          children: [
            {
              attributes: {
                value: "'A",
                dropCap: true
              },
              children: [],
              name: "text"
            }
          ],
          name: "link"
        }
      ]
    },
    {
      attributes: {
        dropCap: true
      },
      children: [
        {
          attributes: {
            value:
              "s I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”",
            dropCap: true
          },
          children: [],
          name: "text"
        }
      ],
      name: "link"
    }
  ],
  name: "paragraph"
};

describe("insertDropcapIntoAST", () => {
  it("should insert dropcap if it belongs to the right template", () => {
    const template = "indepth";
    expect(insertDropcapIntoAST([child], template)).toEqual(childWithDropCap);
  });

  it("should insert dropcap if it belongs to the right template with markup", () => {
    const template = "indepth";
    expect(insertDropcapIntoAST([childWithMarkup], template)).toEqual(
      childWithDropCapAndMarkup
    );
  });

  it("should NOT insert dropcap if it belongs to the wrong template", () => {
    const template = "mainstandard";
    expect(insertDropcapIntoAST([child], template)).toEqual([child]);
  });

  it("should NOT insert dropcap if it belongs to the right template but disableDropcap is true", () => {
    const template = "indepth";
    const isDropcapDisabled = true;
    expect(insertDropcapIntoAST([child], template, isDropcapDisabled)).toEqual([
      child
    ]);
  });

  it("should insert dropcap with quotation mark and first letter", () => {
    const template = "maincomment";
    expect(insertDropcapIntoAST([childWithQuote], template)).toEqual([
      childWithQuoteDropCap
    ]);
  });

  it("should insert dropcap with quotation mark and first letter with markup", () => {
    const template = "maincomment";
    expect(insertDropcapIntoAST([childWithMarkupAndQuote], template)).toEqual([
      childWithDropCapAndMarkupAndQuote
    ]);
  });
});

describe("isQuote", () => {
  it("should return true if the character is straight single quote", () => {
    expect(isQuote("'")).toBe(true);
  });

  it("should return true if the character is opening single quote", () => {
    expect(isQuote("‘")).toBe(true);
  });

  it("should return true if the character is straight double quote", () => {
    expect(isQuote('"')).toBe(true);
  });

  it("should return true if the character is opening double quote", () => {
    expect(isQuote("“")).toBe(true);
  });

  it("should return false if the character is letter", () => {
    expect(isQuote("a")).toBe(false);
  });
});
