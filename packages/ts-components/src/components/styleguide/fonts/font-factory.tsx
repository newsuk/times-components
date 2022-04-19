import { styleguide as timesStyleguide } from '../Styleguide';

export default (scale: any) => ({
  font,
  fontSize
}: {
  font: any;
  fontSize: any;
}) => {
  const styleguide = timesStyleguide({ scale });
  return {
    // @ts-ignore
    fontFamily: styleguide.fonts[font],
    fontSize: styleguide.fontSizes[fontSize],
    lineHeight: styleguide.lineHeight({ font, fontSize })
  };
};
