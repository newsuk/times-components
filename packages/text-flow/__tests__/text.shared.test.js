import { Text, Markup } from '../src/text-flow';
import FontLoader from '../src/Text/FontLoader';

export default () => {
  beforeAll(() => {
    FontLoader.load({}, [
      'TimesDigitalW04-Regular',
      'TimesDigitalW04-Bold',
      'TimesDigitalW04-Italic'
    ])
  })

  it('does layout for a paragraph', () => {
    const text = new Text.Text({
        width: 300,
        font: 'TimesDigitalW04-Regular',
        size: 18,
        lineHeight: 30,
        markup: [
            new Markup.MarkupString("a test paragraph"),
            new Markup.Bold({
                children: [
                    new Markup.MarkupString("some bold stuff")
                ]
            }),
            new Markup.MarkupString("Some other stuff")
        ]
    })

    const extractedTree = text.block.children.map(line => ({
        x: line.x,
        y: line.y,
        width: line.measuredWidth,
        height: line.measuredHeight,
        children: line.children.map(word => ({
            x: word.x,
            y: word.y,
            width: word.measuredWidth,
            height: word.measuredHeight,
            children: word.children.map(char => ({
                x: char.x,
                y: char.y,
                width: char.measuredWidth,
                height: char.measuredHeight,
                character: char.character
            }))
        }))
    }))

    expect(extractedTree).toMatchSnapshot()
  })

  it('creates ideal spans', () => {
    const text = new Text.Text({
        width: 300,
        font: 'TimesDigitalW04-Regular',
        size: 18,
        lineHeight: 30,
        markup: [
            new Markup.MarkupString("a test paragraph"),
            new Markup.Bold({
                children: [
                    new Markup.MarkupString("some bold stuff")
                ]
            }),
            new Markup.MarkupString("Some other stuff")
        ]
    })

    const extractedTree = text.block.children.map(line => ({
        x: line.x,
        y: line.y,
        width: line.measuredWidth,
        height: line.measuredHeight,
        spans: line.idealSpans.map(span => ({
            x: span.x,
            y: span.y,
            width: span.measuredWidth,
            height: span.measuredHeight,
            text: span.text,
            style: span.style
        }))
    }))

    expect(extractedTree).toMatchSnapshot()
  })
};
