import insertDropcapIntoAST from "../../src/dropcap-util";

const child = {
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
  name: "paragraph"
};

const invalidChild = {
  attributes: {},
  children: [
    {
      name: "break"
    },
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
  attributes: {},
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
    name: "dropCap",
    attributes: {},
    children: [
      {
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
        ],
        name: "paragraph"
      }
    ]
  },
  {
    attributes: {},
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
    name: "paragraph"
  }
];

const childWithDropCapAndMarkup = [
  {
    name: "dropCap",
    attributes: {},
    children: [
      {
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
        ],
        name: "paragraph"
      }
    ]
  },
  {
    attributes: {},
    children: [
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

describe("insertDropcapIntoAST", () => {
  it("should insert dropcap if it belongs to the right template", () => {
    const template = "indepth";
    expect(insertDropcapIntoAST([child], template)).toEqual(childWithDropCap);
  });

  it("should fall back to no dropcap if the markup is invalid", () => {
    const template = "indepth";
    expect(insertDropcapIntoAST([invalidChild], template)).toEqual([
      invalidChild
    ]);
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
});
