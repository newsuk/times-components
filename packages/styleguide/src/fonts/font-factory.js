import timesStyleguide from "../styleguide";

export default scale => ({ font, fontSize }) => {
  const styleguide = timesStyleguide({ scale });
  return {
    fontFamily: styleguide.fonts[font],
    fontSize: styleguide.fontSizes[fontSize],
    lineHeight: styleguide.lineHeight({ font, fontSize })
  };
};
