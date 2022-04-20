import styleguide from '../Styleguide';
import { timesFontSizes } from './fonts';
import lineHeight from '../lineHeight';

export default (scale: any) => ({
  font,
  fontSize
}: {
  font: any;
  fontSize: any;
}) => {
  const styles = styleguide({ scale });
  // console.log(scale, font, fontSize, lineHeight);
  return {
    // @ts-ignore
    fontFamily: styles.fonts[font],
    // @ts-ignore
    fontSize: timesFontSizes[fontSize],
    lineHeight: lineHeight({ font, fontSize })
  };
};
