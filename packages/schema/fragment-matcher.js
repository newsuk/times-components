const { IntrospectionFragmentMatcher } = require("apollo-cache-inmemory");

const introspectionQueryResultData = {
  __schema: {
    types: [
      {
        description: "",
        enumValues: null,
        fields: null,
        inputFields: null,
        interfaces: null,
        kind: "UNION",
        name: "Media",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "Image",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "Video",
            ofType: null
          }
        ]
      },
      {
        description:
          "A selection of template types that have opinions over how they should be presented. Usually used within the context of an associated list of articles",
        enumValues: null,
        fields: [
          {
            args: [],
            deprecationReason: null,
            description: "",
            isDeprecated: false,
            name: "template",
            type: {
              kind: "ENUM",
              name: "Template",
              ofType: null
            }
          }
        ],
        inputFields: null,
        interfaces: null,
        kind: "INTERFACE",
        name: "Layout",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "LeadAndTwo",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "OpinionAndTwo",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "Default",
            ofType: null
          }
        ]
      },
      {
        description: "",
        enumValues: null,
        fields: [
          {
            args: [],
            deprecationReason: null,
            description: "",
            isDeprecated: false,
            name: "items",
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Tile",
                    ofType: null
                  }
                }
              }
            }
          }
        ],
        inputFields: null,
        interfaces: null,
        kind: "INTERFACE",
        name: "ArticleSlice",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "StandardSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "FocusSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadersSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneAndFourSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneAndOneSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneFullWidthSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneNoPicAndOneAndPortraitSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadTwoNoPicAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryFourSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryOneSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryOneAndFourSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryTwoAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryTwoNoPicAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "TwoPicAndSixNoPicSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "CommentLeadAndCartoonSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LetterThundererPodcastSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "CommentTwoAndNotebookSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "ObituariesLeadAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "OpinionOneAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryOneAndColumnistSlice",
            ofType: null
          }
        ]
      },
      {
        description: "",
        enumValues: null,
        fields: [
          {
            args: [],
            deprecationReason: null,
            description: "",
            isDeprecated: false,
            name: "id",
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: {
                kind: "SCALAR",
                name: "UUID",
                ofType: null
              }
            }
          },
          {
            args: [],
            deprecationReason: null,
            description: "",
            isDeprecated: false,
            name: "title",
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              }
            }
          },
          {
            args: [],
            deprecationReason: null,
            description: "",
            isDeprecated: false,
            name: "slug",
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: {
                kind: "SCALAR",
                name: "Slug",
                ofType: null
              }
            }
          },
          {
            args: [],
            deprecationReason: null,
            description: "",
            isDeprecated: false,
            name: "colour",
            type: {
              kind: "NON_NULL",
              name: null,
              ofType: {
                kind: "OBJECT",
                name: "Colour",
                ofType: null
              }
            }
          }
        ],
        inputFields: null,
        interfaces: null,
        kind: "INTERFACE",
        name: "Section",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "StandardSection",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "PuzzleSection",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "MagazineSection",
            ofType: null
          }
        ]
      },
      {
        description: "",
        enumValues: null,
        fields: null,
        inputFields: null,
        interfaces: null,
        kind: "UNION",
        name: "PuffMainLink",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "Tile",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "NamedLink",
            ofType: null
          }
        ]
      },
      {
        description: "",
        enumValues: null,
        fields: null,
        inputFields: null,
        interfaces: null,
        kind: "UNION",
        name: "PuffTopicLink",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "StandardSection",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "PuzzleSection",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "NamedLink",
            ofType: null
          }
        ]
      },
      {
        description: "",
        enumValues: null,
        fields: null,
        inputFields: null,
        interfaces: null,
        kind: "UNION",
        name: "StandardSectionItem",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "StandardSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "PuffSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "FocusSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadersSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneAndFourSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneAndOneSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneFullWidthSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneNoPicAndOneAndPortraitSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadTwoNoPicAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryFourSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryOneSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryOneAndFourSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryTwoAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryTwoNoPicAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "TwoPicAndSixNoPicSlice",
            ofType: null
          }
        ]
      },
      {
        description: "",
        enumValues: null,
        fields: null,
        inputFields: null,
        interfaces: null,
        kind: "UNION",
        name: "PuzzleSectionItem",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "Puzzle",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "PuffSlice",
            ofType: null
          }
        ]
      },
      {
        description: "",
        enumValues: null,
        fields: null,
        inputFields: null,
        interfaces: null,
        kind: "UNION",
        name: "MagazineSectionItem",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "StandardSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "PuffSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "FocusSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadersSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneAndFourSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneAndOneSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneFullWidthSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadOneNoPicAndOneAndPortraitSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "LeadTwoNoPicAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryFourSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryOneSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryOneAndFourSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryTwoAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "SecondaryTwoNoPicAndTwoSlice",
            ofType: null
          },
          {
            kind: "OBJECT",
            name: "TwoPicAndSixNoPicSlice",
            ofType: null
          }
        ]
      }
    ]
  }
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

module.exports.fragmentMatcher = fragmentMatcher;
