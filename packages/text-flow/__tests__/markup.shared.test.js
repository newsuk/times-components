import { Roboto } from "@times-components/test-utils";
import { MarkupFactory } from "../src/text-flow";
import FontLoader from "../src/Text/FontLoader";

const { Bold, Italic, Body, Link } = MarkupFactory({
  bodyFont: "TimesDigitalW04-Regular",
  boldFont: "TimesDigitalW04-Bold",
  italicFont: "TimesDigitalW04-Italic"
});

export default () => {
  beforeAll(() => {
    [
      "TimesDigitalW04-Regular",
      "TimesDigitalW04-Bold",
      "TimesDigitalW04-Italic"
    ].forEach(name => FontLoader.loadFont(name, Roboto));
  });

  it("MarkupString returns characters", () => {
    const string = new Body("Foobar");

    expect(
      string
        .characters({
          font: "TimesDigitalW04-Regular",
          size: 12
        })
        .map(c => c.character)
    ).toEqual(["F", "o", "o", "b", "a", "r"]);

    expect(
      string
        .characters({
          font: "TimesDigitalW04-Regular",
          size: 12
        })
        .map(c => ({
          height: c.measuredHeight,
          width: c.measuredWidth,
          x: c.x,
          y: c.y
        }))
    ).toMatchSnapshot();
  });

  it("bold applies style", () => {
    const bold = new Bold({
      children: [new Body("Foobar")]
    });

    expect(
      bold.characters({
        font: "TimesDigitalW04-Regular"
      })[0].font
    ).toEqual("TimesDigitalW04-Bold");
  });

  it("italic applies style", () => {
    const italic = new Italic({
      children: [new Body("Foobar")]
    });

    expect(
      italic.characters({
        font: "TimesDigitalW04-Regular"
      })[0].font
    ).toEqual("TimesDigitalW04-Italic");
  });

  it("link saves href", () => {
    const link = new Link({
      children: [new Body("Foobar")],
      href: "test"
    });

    expect(
      link.characters({
        font: "TimesDigitalW04-Regular"
      })[0].href
    ).toEqual("test");
  });
};
