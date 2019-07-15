import { Roboto } from "@times-components/test-utils";
import { Text, Markup, Layout } from "../src/text-flow";
import FontLoader from "../src/Text/FontLoader";

export default () => {
  beforeAll(() => {
    [
      "TimesDigitalW04-Regular",
      "TimesDigitalW04-Bold",
      "TimesDigitalW04-Italic"
    ].forEach(name => FontLoader.loadFont(name, Roboto));
  });

  it("indents lines next to an inline", () => {
    const flow = new Layout.TextFlow({
      flow: [
        new Layout.Block({
          getComponent() {},
          height: 100,
          width: 660
        }),
        new Layout.InlineBlock({
          getComponent() {},
          height: 30,
          width: 660 * 0.35
        }),
        new Text.Text({
          font: "TimesDigitalW04-Regular",
          lineHeight: 30,
          markup: [new Markup.MarkupString("example text")],
          size: 18,
          width: 660
        })
      ],
      width: 660
    });

    const textFlows = flow.block.children;
    const inline = textFlows[1];
    const text = inline.children[0];
    const lines = text.block.children;

    expect(lines[0].x).toBeGreaterThan(230);
  });
};
