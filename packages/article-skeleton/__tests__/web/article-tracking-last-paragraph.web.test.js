import tagLastParagraph from "../../src/tracking/article-tracking-last-paragraph";

const noPaywallArticle = [
  {
    attributes: {
      title: "title"
    },
    children: [
      {
        name: "unorderedList"
      }
    ],
    name: "keyFacts"
  }
];

const articleWithPaywall = [
  {
    attributes: {
      title: "title"
    },
    children: [
      {
        name: "unorderedList"
      }
    ],
    name: "keyFacts"
  },
  {
    children: [
      { attributes: { value: 1 }, children: [], name: "paragraph" },
      { attributes: { value: 2 }, children: [], name: "other" },
      { attributes: { value: 3 }, children: [], name: "paragraph" },
      { attributes: { value: 4 }, children: [], name: "other" },
      { attributes: { value: 5 }, children: [], name: "paragraph" },
      { attributes: { value: 6 }, children: [], name: "paragraph" },
      { attributes: { value: 7 }, children: [], name: "other" }
    ],
    name: "paywall"
  }
];

describe("tagLastParagraph", () => {
  it("no paywall", () => {
    expect(tagLastParagraph(noPaywallArticle)).toStrictEqual(noPaywallArticle);
  });
  it("with paywall", () => {
    expect(tagLastParagraph(articleWithPaywall)).toMatchSnapshot();
  });
});
