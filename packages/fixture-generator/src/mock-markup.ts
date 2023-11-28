import { Markup } from "./types";

const markupTypes: Markup = {
  paragraph: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Critically, he said this would not necessarily require the withdrawal agreement to be reopened but could instead be done by a legally binding codicil. He added that should his amendment be passed in a Commons vote tomorrow it would give “enormous firepower” to the prime minister when she returned to Brussels."
        },
        children: []
      }
    ]
  },
  ad: {
    name: "ad",
    attributes: {},
    children: []
  },
  inline: {
    name: "inline",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "Libby Purves"
        },
        children: []
      }
    ]
  },
  bylines: [
    {
      byline: [
        {
          name: "author",
          children: [
            {
              name: "text",
              children: [],
              attributes: {
                value: "Richard Lloyd Parry"
              }
            }
          ],
          attributes: {
            slug: "richard-lloyd-parry"
          }
        }
      ],
      image: null
    },
    {
      byline: [
        {
          name: "inline",
          children: [
            {
              name: "text",
              children: [],
              attributes: {
                value: ", Hanoi"
              }
            }
          ]
        }
      ],
      image: null
    }
  ],
  summary105: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Theresa May has two objectives tomorrow when MPs get to vote on Brexit — the trouble is both are fraught"
        },
        children: []
      }
    ]
  },
  summary125: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Theresa May has two objectives tomorrow when MPs get to vote on Brexit — the trouble is both are fraught with difficulty."
        },
        children: []
      }
    ]
  },
  summary145: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Theresa May has two objectives tomorrow when MPs get to vote on Brexit — the trouble is both are fraught with difficulty."
        },
        children: []
      }
    ]
  },
  summary160: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Theresa May has two objectives tomorrow when MPs get to vote on Brexit — the trouble is both are fraught with difficulty. The first is to try and stop MPs voting"
        },
        children: []
      }
    ]
  },
  summary175: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Theresa May has two objectives tomorrow when MPs get to vote on Brexit — the trouble is both are fraught with difficulty. The first is to try and stop MPs voting to take"
        },
        children: []
      }
    ]
  },
  summary225: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Theresa May has two objectives tomorrow when MPs get to vote on Brexit — the trouble is both are fraught with difficulty. The first is to try and stop MPs voting to take control of the Brexit process themselves. To do this a"
        },
        children: []
      }
    ]
  },
  summary300: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "‘The prodigal son returns.” So read a banner tied to the wall of the Paul Strank Stand at Kingsmeadow, the home of AFC Wimbledon, on Saturday, alongside the sepia-toned image of a fresh-faced Wally Downes, sporting an 80s haircut and Wimbledon strip, with a mischievous glint in his eye."
        },
        children: []
      }
    ]
  },
  summary800: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Senior ministers accused Labour today of trying to “frustrate and cancel Brexit” after the party announced plans to hijack Boris Johnson’s deal with amendments for a second referendum and customs union with the EU. Rishi Sunak, the chief secretary to the Treasury, warned that any attempt by MPs to add a customs union to the government’s Brexit deal would be “procedural tricks” intended to frustrate departure. His comments came as ministers announced that they planned to publish the legislation that would formally take Britain out of the European Union today. They will also apply to the Speaker to hold another so-called meaningful vote on the deal following Mr Johnson’s decision to comply with the Benn act, which forces the prime minister to request a Brexit"
        },
        children: []
      }
    ]
  },
  summary1000: {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value:
            "Senior ministers accused Labour today of trying to “frustrate and cancel Brexit” after the party announced plans to hijack Boris Johnson’s deal with amendments for a second referendum and customs union with the EU. Rishi Sunak, the chief secretary to the Treasury, warned that any attempt by MPs to add a customs union to the government’s Brexit deal would be “procedural tricks” intended to frustrate departure. His comments came as ministers announced that they planned to publish the legislation that would formally take Britain out of the European Union today. They will also apply to the Speaker to hold another so-called meaningful vote on the deal following Mr Johnson’s decision to comply with the Benn act, which forces the prime minister to request a Brexit. to “frustrate and cancel Brexit” after the party announced plans to hijack Boris Johnson’s deal with amendments for a second referendum and customs union with the EU. Rishi Sunak, the chief secretary to the Treasury, warned that any attempt by MPs to add a customs union to the government’s Brexit deal would be “procedural tricks” intended to frustrate departure. His comments came as ministers announced that they planned to publish the legislation that would formally take Britain out of the European Union today."
        },
        children: []
      }
    ]
  }
};

interface MarkupConfig {
  length: number;
  overrideText?: string;
}

const generateMarkup = (
  array: Array<Markup>,
  markupType: Markup,
  iterations: number
) => {
  new Array(iterations)
    .fill(0)
    .forEach(() => array.push(markupTypes[markupType]));
  return array;
};
class MockMarkup {
  markup: Markup;

  constructor() {
    this.markup = [];
  }

  addParagraphs(length: number = 1) {
    this.markup = generateMarkup(
      this.markup,
      markupTypes.paragraph.name,
      length
    );
    return this;
  }

  addAds(length: number = 1) {
    this.markup = generateMarkup(this.markup, markupTypes.ad.name, length);
    return this;
  }

  addInlines(length: number = 1) {
    this.markup = generateMarkup(this.markup, markupTypes.inline.name, length);
    return this;
  }

  addBylines() {
    this.markup = markupTypes.bylines;
    return this;
  }

  addSummary(summaryName: string) {
    this.markup = generateMarkup(this.markup, summaryName, 1);
    return this;
  }

  get() {
    return this.markup;
  }
}

export default MockMarkup;
