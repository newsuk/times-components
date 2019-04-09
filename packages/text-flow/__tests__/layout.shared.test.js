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

  it('does layout for a Text Flow', () => {
      const flow = new Layout.TextFlow({
          flow: [
            
          ]
      })
  })
};
