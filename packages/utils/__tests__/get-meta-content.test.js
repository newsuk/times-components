import getMetaContent from "../src/get-meta-content";

const description = [
  {
    attributes: { value: "Chelsea is known for its " },
    children: []
  },
  {
    attributes: {},
    children: [{ attributes: { value: "affluent " } }]
  },
  {
    attributes: { value: "population." },
    children: []
  }
];

const longDescription = [
  {
    attributes: {
      value: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Dui nunc mattis enim ut tellus elementum sagittis vitae et. Sed cras ornare arcu dui vivamus arcu.
        Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor.
        Ante in nibh mauris cursus mattis molestie. Turpis cursus in hac habitasse platea dictumst quisque. Commodo ullamcorper a lacus vestibulum sed.
        A diam sollicitudin tempor id eu nisl. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus.
        Imperdiet nulla malesuada pellentesque elit eget gravida cum. Sed augue lacus viverra vitae congue eu consequat ac.`
    },
    children: []
  }
];

describe("getMetaContent should", () => {
  it("formulate a string out of a topic description", () => {
    expect(getMetaContent(description)).toEqual(
      "Chelsea is known for its affluent population."
    );
  });
  it("return an empty string if there is no description available", () => {
    expect(getMetaContent([])).toEqual("");
  });
  it("cap a strings length at 200 chars", () => {
    const longMetaTag = getMetaContent(longDescription);
    expect(longMetaTag.length).toEqual(200);
  });
});
