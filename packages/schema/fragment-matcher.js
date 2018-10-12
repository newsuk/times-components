const { IntrospectionFragmentMatcher } = require("apollo-cache-inmemory");

const introspectionQueryResultData = {
  __schema: {
    types: [
      {
        kind: "UNION",
        name: "Media",
        description: "",
        fields: null,
        inputFields: null,
        interfaces: null,
        enumValues: null,
        possibleTypes: [
          { kind: "OBJECT", name: "Image", ofType: null },
          { kind: "OBJECT", name: "Video", ofType: null }
        ]
      },
      {
        kind: "INTERFACE",
        name: "Layout",
        description:
          "A selection of template types that have opinions over how they should be presented. Usually used within the context of an associated list of articles",
        fields: [
          {
            name: "template",
            description: "",
            args: [],
            type: { kind: "ENUM", name: "Template", ofType: null },
            isDeprecated: false,
            deprecationReason: null
          }
        ],
        inputFields: null,
        interfaces: null,
        enumValues: null,
        possibleTypes: [
          { kind: "OBJECT", name: "LeadAndTwo", ofType: null },
          { kind: "OBJECT", name: "OpinionAndTwo", ofType: null },
          { kind: "OBJECT", name: "Default", ofType: null }
        ]
      },
      {
        kind: "INTERFACE",
        name: "ArticleSlice",
        description: "",
        fields: [
          {
            name: "items",
            description: "",
            args: [],
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: { kind: "OBJECT", name: "Tile", ofType: null }
                }
              }
            },
            isDeprecated: false,
            deprecationReason: null
          }
        ],
        inputFields: null,
        interfaces: null,
        enumValues: null,
        possibleTypes: [
          { kind: "OBJECT", name: "StandardSlice", ofType: null },
          { kind: "OBJECT", name: "FocusSlice", ofType: null },
          { kind: "OBJECT", name: "LeadersSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneAndFourSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneAndOneSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneAndTwoSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneFullWidthSlice", ofType: null },
          {
            kind: "OBJECT",
            name: "LeadOneNoPicAndOneAndPortraitSlice",
            ofType: null
          },
          { kind: "OBJECT", name: "LeadTwoNoPicAndTwoSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryFourSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryOneSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryOneAndFourSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryTwoAndTwoSlice", ofType: null },
          {
            kind: "OBJECT",
            name: "SecondaryTwoNoPicAndTwoSlice",
            ofType: null
          },
          { kind: "OBJECT", name: "TwoPicAndSixNoPicSlice", ofType: null },
          { kind: "OBJECT", name: "CommentLeadAndCartoonSlice", ofType: null },
          { kind: "OBJECT", name: "LetterThundererPodcastSlice", ofType: null },
          { kind: "OBJECT", name: "CommentTwoAndNotebookSlice", ofType: null },
          { kind: "OBJECT", name: "ObituariesLeadAndTwoSlice", ofType: null },
          { kind: "OBJECT", name: "OpinionOneAndTwoSlice", ofType: null },
          {
            kind: "OBJECT",
            name: "SecondaryOneAndColumnistSlice",
            ofType: null
          }
        ]
      },
      {
        kind: "INTERFACE",
        name: "Section",
        description: "",
        fields: [
          {
            name: "id",
            description: "",
            args: [],
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: { kind: "SCALAR", name: "UUID", ofType: null }
            },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: "title",
            description: "",
            args: [],
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: { kind: "SCALAR", name: "String", ofType: null }
            },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: "slug",
            description: "",
            args: [],
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: { kind: "SCALAR", name: "Slug", ofType: null }
            },
            isDeprecated: false,
            deprecationReason: null
          },
          {
            name: "colour",
            description: "",
            args: [],
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: { kind: "OBJECT", name: "Colour", ofType: null }
            },
            isDeprecated: false,
            deprecationReason: null
          }
        ],
        inputFields: null,
        interfaces: null,
        enumValues: null,
        possibleTypes: [
          { kind: "OBJECT", name: "StandardSection", ofType: null },
          { kind: "OBJECT", name: "PuzzleSection", ofType: null },
          { kind: "OBJECT", name: "MagazineSection", ofType: null }
        ]
      },
      {
        kind: "UNION",
        name: "PuffMainLink",
        description: "",
        fields: null,
        inputFields: null,
        interfaces: null,
        enumValues: null,
        possibleTypes: [
          { kind: "OBJECT", name: "Tile", ofType: null },
          { kind: "OBJECT", name: "NamedLink", ofType: null }
        ]
      },
      {
        kind: "UNION",
        name: "PuffTopicLink",
        description: "",
        fields: null,
        inputFields: null,
        interfaces: null,
        enumValues: null,
        possibleTypes: [
          { kind: "OBJECT", name: "StandardSection", ofType: null },
          { kind: "OBJECT", name: "PuzzleSection", ofType: null },
          { kind: "OBJECT", name: "NamedLink", ofType: null }
        ]
      },
      {
        kind: "UNION",
        name: "StandardSectionItem",
        description: "",
        fields: null,
        inputFields: null,
        interfaces: null,
        enumValues: null,
        possibleTypes: [
          { kind: "OBJECT", name: "StandardSlice", ofType: null },
          { kind: "OBJECT", name: "PuffSlice", ofType: null },
          { kind: "OBJECT", name: "FocusSlice", ofType: null },
          { kind: "OBJECT", name: "LeadersSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneAndFourSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneAndOneSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneAndTwoSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneFullWidthSlice", ofType: null },
          {
            kind: "OBJECT",
            name: "LeadOneNoPicAndOneAndPortraitSlice",
            ofType: null
          },
          { kind: "OBJECT", name: "LeadTwoNoPicAndTwoSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryFourSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryOneSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryOneAndFourSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryTwoAndTwoSlice", ofType: null },
          {
            kind: "OBJECT",
            name: "SecondaryTwoNoPicAndTwoSlice",
            ofType: null
          },
          { kind: "OBJECT", name: "TwoPicAndSixNoPicSlice", ofType: null }
        ]
      },
      {
        kind: "UNION",
        name: "PuzzleSectionItem",
        description: "",
        fields: null,
        inputFields: null,
        interfaces: null,
        enumValues: null,
        possibleTypes: [
          { kind: "OBJECT", name: "Puzzle", ofType: null },
          { kind: "OBJECT", name: "PuffSlice", ofType: null }
        ]
      },
      {
        kind: "UNION",
        name: "MagazineSectionItem",
        description: "",
        fields: null,
        inputFields: null,
        interfaces: null,
        enumValues: null,
        possibleTypes: [
          { kind: "OBJECT", name: "StandardSlice", ofType: null },
          { kind: "OBJECT", name: "PuffSlice", ofType: null },
          { kind: "OBJECT", name: "FocusSlice", ofType: null },
          { kind: "OBJECT", name: "LeadersSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneAndFourSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneAndOneSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneAndTwoSlice", ofType: null },
          { kind: "OBJECT", name: "LeadOneFullWidthSlice", ofType: null },
          {
            kind: "OBJECT",
            name: "LeadOneNoPicAndOneAndPortraitSlice",
            ofType: null
          },
          { kind: "OBJECT", name: "LeadTwoNoPicAndTwoSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryFourSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryOneSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryOneAndFourSlice", ofType: null },
          { kind: "OBJECT", name: "SecondaryTwoAndTwoSlice", ofType: null },
          {
            kind: "OBJECT",
            name: "SecondaryTwoNoPicAndTwoSlice",
            ofType: null
          },
          { kind: "OBJECT", name: "TwoPicAndSixNoPicSlice", ofType: null }
        ]
      }
    ]
  }
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

module.exports.fragmentMatcher = fragmentMatcher;
