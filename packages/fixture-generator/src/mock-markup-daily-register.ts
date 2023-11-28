import { Markup } from "./types";

const markupTypes: Markup = {
  name: "DailyUniversalRegister",
  briefing: {
    title: "Briefing",
    byline: [],
    content: [
      {
        name: "paragraph",
        children: [
          {
            name: "bold",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "UK:"
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value:
                " Emily Thornberry, the shadow foreign secretary, gives a speech in London on Labour Party foreign policy."
            }
          }
        ]
      },
      {
        name: "paragraph",
        children: [
          {
            name: "bold",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "Belgium:"
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value:
                " Jean-Claude Juncker, European Commission president, and Donald Tusk, European Council president, meet Leo Varadkar, the Irish prime minister, to discuss Brexit."
            }
          }
        ]
      }
    ]
  },
  onThisDay: {
    title: "On this day",
    byline: [],
    content: [
      {
        name: "paragraph",
        children: [
          {
            name: "text",
            children: [],
            attributes: {
              value: "In "
            }
          },
          {
            name: "bold",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "1685 "
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value: "King James II acceded to the throne; in "
            }
          },
          {
            name: "bold",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "1952 "
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value:
                "Queen Elizabeth II acceded to the throne while visiting Kenya; in "
            }
          },
          {
            name: "bold",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "1958 "
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value:
                "seven members of the Manchester United football team were among those killed in an air crash in Munich; in "
            }
          },
          {
            name: "bold",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "1964 "
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value:
                "France and Britain agreed on the building of a Channel tunnel."
            }
          }
        ]
      }
    ]
  },
  natureNotes: {
    title: "Nature notes",
    byline: [
      {
        name: "inline",
        children: [
          {
            name: "text",
            children: [],
            attributes: {
              value: "Derwent May"
            }
          }
        ]
      }
    ],
    content: [
      {
        name: "paragraph",
        children: [
          {
            name: "text",
            children: [],
            attributes: {
              value:
                "Many of the stoats in Scotland and northern England are now camouflaged against the snow by their remarkable white winter fur. They would be conspicuous in a snowy landscape if they still had the reddish-brown coats of fur that they had in the summer. The white coat gives them protection against their predators, such as foxes and golden eagles, and enables them to steal up unseen on the small animals they prey on. They acquire it very quickly once the snow falls, but the tip of their tail always remains black. However, stoats living farther south in Britain keep the same brown coat all the year round, even when snow falls. The beautiful, silky, white winter fur is called ermine, and the animal itself is sometimes called the ermine. This fur has always been very precious material for use in clothes and has been used to line the crowns of monarchs."
            }
          }
        ]
      }
    ]
  },
  birthdaysToday: {
    title: "Birthdays today",
    content: [
      {
        name: "paragraph",
        children: [
          {
            name: "bold",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "Rick Astley"
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value: ", singer-songwriter, "
            }
          },
          {
            name: "italic",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "Never Gonna Give You Up "
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value: "(1987), 53; "
            }
          },
          {
            name: "bold",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "Mike Batt"
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value: ", composer, songwriter, "
            }
          },
          {
            name: "italic",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "Wombling Free "
                }
              }
            ]
          },
          {
            name: "text",
            children: [],
            attributes: {
              value: "(1978), "
            }
          },
          {
            name: "italic",
            children: [
              {
                name: "text",
                children: [],
                attributes: {
                  value: "Bright Eyes "
                }
              }
            ]
          }
        ]
      }
    ]
  }
};

const generateDailyRegisterMarkup = (
  array: Array<Markup>,
  markupType: Markup,
  iterations: number
) => {
  new Array(iterations)
    .fill(0)
    .forEach(() => array.push(...markupTypes[markupType].content));
  return array;
};

class MockDailyRegisterMarkup {
  markup: Markup;

  constructor() {
    this.markup = [];
  }

  addBriefing(length: number = 1) {
    this.markup = generateDailyRegisterMarkup(this.markup, "briefing", length);
    return this;
  }

  addOnThisDay(length: number = 1) {
    this.markup = generateDailyRegisterMarkup(this.markup, "onThisDay", length);
    return this;
  }

  addNatureNotes(length: number = 1) {
    this.markup = generateDailyRegisterMarkup(
      this.markup,
      "natureNotes",
      length
    );
    return this;
  }

  addBirthdaysToday(length: number = 1) {
    this.markup = generateDailyRegisterMarkup(
      this.markup,
      "birthdaysToday",
      length
    );
    return this;
  }

  get() {
    return this.markup;
  }
}

export default MockDailyRegisterMarkup;
