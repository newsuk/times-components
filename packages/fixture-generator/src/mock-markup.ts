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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
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
          value: "inline markup"
        },
        children: []
      }
    ]
  }
};

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

  get() {
    return this.markup;
  }
}

export default MockMarkup;
