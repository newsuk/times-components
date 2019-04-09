import { Text, Markup, Layout } from '../src/text-flow';
import FontLoader from '../src/Text/FontLoader';

export default () => {
  beforeAll(() => {
    FontLoader.load({}, [
      'TimesDigitalW04-Regular',
      'TimesDigitalW04-Bold',
      'TimesDigitalW04-Italic'
    ])
  })

  it('indents lines next to an inline', () => {
      const flow = new Layout.TextFlow({
          width: 660,
          flow: [
            new Layout.Block({
              height: 100,
              width: 660,
              getComponent() {

              }
            }),
            new Layout.InlineBlock({
              width: 660 * 0.35,
              height: 30,
              getComponent() {

              }
            }),
            new Text.Text({
              width: 660,
              size: 18,
              lineHeight: 30,
              font: 'TimesDigitalW04-Regular',
              markup: [
                new Markup.MarkupString("example text")
              ]
            })
          ]
      })

      const textFlows = flow.block.children
      const inline = textFlows[1]
      const text = inline.children[0]
      const lines = text.block.children

      expect(lines[0].x).toBeGreaterThan(230)
  })
};
