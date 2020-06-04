export const paragraphWithSingleInlineMarkup = [
  {
    name: "paragraph",
    children: [
      {
        name: "inline",
        children: [
          {
            name: "text",
            children: [],
            attributes: {
              value:
                "They may have been improved by the controversy that ensued when Watson appeared on the cover of Vanity Fair to promote it, wearing a top that partially exposed her breasts. She rejected criticism that the pose was at odds with her claim to be a feminist. “Feminism is not a stick with which to beat other women. It’s about liberation. It’s about equality,” she said, adding: “I really don’t know what my tits have to do with it.” "
            }
          }
        ]
      }
    ]
  }
];

export const paragraphWithTextAndInlineMarkup = [
  {
    name: "paragraph",
    children: [
      {
        name: "text",
        children: [],
        attributes: {
          value: "20. "
        }
      },
      {
        name: "inline",
        children: [
          {
            name: "text",
            children: [],
            attributes: {
              value:
                "Participants’ names and general locations will be published if they are the winner of the Competition in accordance with regulatory requirements, both during this and future promotions by the Promoter or any associated or subsidiary company of News Corp UK & Ireland Limited."
            }
          }
        ]
      }
    ]
  }
];

export const paragraphWithNestedInlineMarkup = [
  {
    name: "paragraph",
    children: [
      {
        name: "bold",
        children: [
          {
            name: "inline",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "Meera Menon, 15, 100min"
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
