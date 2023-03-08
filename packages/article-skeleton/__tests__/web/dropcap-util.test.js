import insertDropcapIntoAST from "../../src/contentModifiers/dropcap-util";
import { isQuote } from "../../src/contentModifiers/dropcap-util-common";

const childWithMarkupNoChildren = {
  name: "paragraph",
  children: [
    {
      name: "link",
      children: [],
      attributes: {
        href:
          "https://www.telegraph.co.uk/business/2023/03/05/huawei-abandons-plans-1bn-cambridge-research-campus/"
      }
    }
  ]
};

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

const childWithKeyFacts = [
  {
    name: "keyFacts",
    children: [
      {
        name: "unorderedList",
        children: [
          {
            name: "listElement",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "First fact"
                }
              }
            ]
          }
        ]
      }
    ],
    attributes: {
      title: "Key facts title"
    }
  },
  {
    name: "paragraph",
    children: [
      {
        name: "text",
        children: [],
        attributes: {
          value:
            "As I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”"
        }
      }
    ]
  }
];

const childWithKeyFactsDropCapped = [
  {
    name: "keyFacts",
    children: [
      {
        name: "unorderedList",
        children: [
          {
            name: "listElement",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "First fact"
                }
              }
            ]
          }
        ]
      }
    ],
    attributes: {
      title: "Key facts title"
    }
  },
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

const childWithKeyFactsAndInteractive = [
  {
    name: "interactive",
    attributes: {
      id: "25ba0601-75f3-473e-80c2-9e6f09d61549",
      display: "primary",
      url:
        "https://components.timesdev.tools/lib2/times-chapter-menu-1.0.0/chapter-menu.html",
      element: {
        value: "chapter-menu",
        attributes: {
          buttons:
            "Series three%20%7C%20%20Series two%20%7C%20%20Series one%20%7C%20",
          chapters:
            "Series%20three%20%7C%20Series%20two%20%7C%20Series%20one%20%7C%20"
        }
      }
    },
    children: []
  },
  {
    name: "keyFacts",
    children: [
      {
        name: "unorderedList",
        children: [
          {
            name: "listElement",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "First fact"
                }
              }
            ]
          }
        ]
      }
    ],
    attributes: {
      title: "Key facts title"
    }
  },
  {
    name: "paragraph",
    children: [
      {
        name: "text",
        children: [],
        attributes: {
          value:
            "As I follow Chris Reynolds Gordon down the first f…fty Shades of Grey but, he says, “I’m living it.”"
        }
      }
    ]
  }
];

const childWithKeyFactsAndInteractiveDropCapped = [
  {
    name: "interactive",
    attributes: {
      id: "25ba0601-75f3-473e-80c2-9e6f09d61549",
      display: "primary",
      url:
        "https://components.timesdev.tools/lib2/times-chapter-menu-1.0.0/chapter-menu.html",
      element: {
        value: "chapter-menu",
        attributes: {
          buttons:
            "Series three%20%7C%20%20Series two%20%7C%20%20Series one%20%7C%20",
          chapters:
            "Series%20three%20%7C%20Series%20two%20%7C%20Series%20one%20%7C%20"
        }
      }
    },
    children: []
  },
  {
    name: "keyFacts",
    children: [
      {
        name: "unorderedList",
        children: [
          {
            name: "listElement",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "First fact"
                }
              }
            ]
          }
        ]
      }
    ],
    attributes: {
      title: "Key facts title"
    }
  },
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

describe("insertDropcapIntoAST", () => {
  it("should insert dropcap if it belongs to the right template", () => {
    const template = "indepth";
    expect(insertDropcapIntoAST(template)([child])).toEqual(childWithDropCap);
  });

  it("should insert dropcap if it belongs to the right template with markup", () => {
    const template = "indepth";
    expect(insertDropcapIntoAST(template)([childWithMarkup])).toEqual(
      childWithDropCapAndMarkup
    );
  });

  it("should NOT insert dropcap if it belongs to the wrong template", () => {
    const template = "mainstandard";
    expect(insertDropcapIntoAST(template)([child])).toEqual([child]);
  });
  it("should NOT insert dropcap if the markup does not contain children even with disableDropcap true", () => {
    const template = "indepth";
    const isDropcapDisabled = false;
    expect(
      insertDropcapIntoAST(template, isDropcapDisabled)([
        childWithMarkupNoChildren
      ])
    ).toEqual([childWithMarkupNoChildren]);
  });

  it("should NOT insert dropcap if it belongs to the right template but disableDropcap is true", () => {
    const template = "indepth";
    const isDropcapDisabled = true;
    expect(insertDropcapIntoAST(template, isDropcapDisabled)([child])).toEqual([
      child
    ]);
  });

  it("should insert dropcap with quotation mark and first letter", () => {
    const template = "maincomment";
    expect(insertDropcapIntoAST(template)([childWithQuote])).toEqual([
      childWithQuoteDropCap
    ]);
  });

  it("should insert dropcap with quotation mark and first letter with markup", () => {
    const template = "maincomment";
    expect(insertDropcapIntoAST(template)([childWithMarkupAndQuote])).toEqual([
      childWithDropCapAndMarkupAndQuote
    ]);
  });

  it("should insert dropcap to the first paragraph when the article start with keyfacts", () => {
    const template = "indepth";
    expect(insertDropcapIntoAST(template)(childWithKeyFacts)).toEqual(
      childWithKeyFactsDropCapped
    );
  });
  it("should insert dropcap to the first paragraph when the article start with has keyfacts and interactive", () => {
    const template = "indepth";
    expect(
      insertDropcapIntoAST(template)(childWithKeyFactsAndInteractive)
    ).toEqual(childWithKeyFactsAndInteractiveDropCapped);
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
