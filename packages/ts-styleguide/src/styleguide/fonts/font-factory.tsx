import styleguide from '../Styleguide';
import { timesFontSizes, fontStyles } from './fonts';
import lineHeight from '../lineHeight';

export default ({
  font,
  fontSize
}: {
  font: keyof typeof fontStyles;
  fontSize: keyof typeof timesFontSizes;
}) => {
  const styles = styleguide();
  return {
    fontFamily: styles.fonts[font],
    fontSize: timesFontSizes[fontSize],
    lineHeight: lineHeight({ font, fontSize })
  };
};
