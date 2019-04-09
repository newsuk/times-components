import { Markup, Text } from '../src/text-flow';
import FontLoader from '../src/Text/FontLoader';

export default () => {
  beforeAll(() => {
    FontLoader.load({}, [
      'TimesDigitalW04-Regular',
      'TimesDigitalW04-Bold',
      'TimesDigitalW04-Italic'
    ])
  })

  it("MarkupString returns characters", () => {
    const string = new Markup.MarkupString("Foobar")
    
    expect(string.characters({
      font: 'TimesDigitalW04-Regular',
      size: 12,
    }).map(c => c.character)).toEqual(['F', 'o', 'o', 'b', 'a', 'r'])

    expect(string.characters({
      font: 'TimesDigitalW04-Regular',
      size: 12
    }).map(c => ({
      width: c.measuredWidth,
      height: c.measuredHeight,
      x: c.x,
      y: c.y
    }))).toMatchSnapshot()
  });

  it('bold applies style', () => {
    const bold = new Markup.Bold({
      children: [
        new Markup.MarkupString("Foobar")
      ]
    })

    expect(bold.characters({
      font: 'TimesDigitalW04-Regular'
    })[0].font).toEqual('TimesDigitalW04-Bold')
  })

  it('italic applies style', () => {
    const italic = new Markup.Italic({
      children: [
        new Markup.MarkupString("Foobar")
      ]
    })

    expect(italic.characters({
      font: 'TimesDigitalW04-Regular'
    })[0].font).toEqual('TimesDigitalW04-Italic')
  })

  it('link saves href', () => {
    const link = new Markup.Link({
      href: 'test',
      children: [
        new Markup.MarkupString("Foobar")
      ]
    })

    expect(link.characters({
      font: 'TimesDigitalW04-Regular'
    })[0].href).toEqual('test')
  })
};
