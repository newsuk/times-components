const defaultPullQuote =
  "[The judgement was] taken because of the evidence available in the court today, that the grandmother is an appropriate carer for the child";

export default ({ pullQuote = defaultPullQuote } = {}) => [
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "This is the text for paragraph one"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "This is the text for paragraph two"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "This is the text for paragraph two"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "This is the text for paragraph two"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "This is the text for paragraph two"
        },
        children: []
      }
    ]
  },
  {
    name: "pullQuote",
    attributes: {
      content: pullQuote,
      caption: {
        name: "Katie Glass",
        twitter: "@KatieGlassST"
      }
    },
    children: []
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "This is the text for paragraph two"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "This is the text for paragraph two"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "This is the text for paragraph two"
        },
        children: []
      }
    ]
  },
  {
    name: "paragraph",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "This is the text for paragraph two"
        },
        children: []
      }
    ]
  }
];
