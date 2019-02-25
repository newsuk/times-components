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

  addSummary(summaryName: string) {
    this.markup = generateMarkup(this.markup, summaryName, 1);
    return this;
  }

  get() {
    return this.markup;
  }
}

export default MockMarkup;
