import { Text, Markup } from "../src/text-flow";
import FontLoader from "../src/Text/FontLoader";

export default () => {
  beforeAll(() => {
    FontLoader.load({}, [
      "TimesDigitalW04-Regular",
      "TimesDigitalW04-Bold",
      "TimesDigitalW04-Italic"
    ]);
  });

  it("does layout for a paragraph", () => {
    const text = new Text.Text({
      font: "TimesDigitalW04-Regular",
      lineHeight: 30,
      markup: [
        new Markup.MarkupString("a test paragraph"),
        new Markup.Bold({
          children: [new Markup.MarkupString("some bold stuff")]
        }),
        new Markup.MarkupString("Some other stuff")
      ],
      size: 18,
      width: 300
    });

    const extractedTree = text.block.children.map(line => ({
      children: line.children.map(word => ({
        children: word.children.map(char => char.character).join(""),
        height: word.measuredHeight,
        width: word.measuredWidth,
        x: word.x,
        y: word.y
      })),
      height: line.measuredHeight,
      width: line.measuredWidth,
      x: line.x,
      y: line.y
    }));

    expect(extractedTree).toMatchSnapshot();
  });

  it("creates ideal spans", () => {
    const text = new Text.Text({
      font: "TimesDigitalW04-Regular",
      lineHeight: 30,
      markup: [
        new Markup.MarkupString("a test paragraph"),
        new Markup.Bold({
          children: [new Markup.MarkupString("some bold stuff")]
        }),
        new Markup.MarkupString("Some other stuff")
      ],
      size: 18,
      width: 300
    });

    const extractedTree = text.block.children.map(line => ({
      height: line.measuredHeight,
      spans: line.idealSpans.map(span => ({
        height: span.measuredHeight,
        style: span.style,
        text: span.text,
        width: span.measuredWidth,
        x: span.x,
        y: span.y
      })),
      width: line.measuredWidth,
      x: line.x,
      y: line.y
    }));

    expect(extractedTree).toMatchSnapshot();
  });
};
