import timesStyleguide from "../styleguide";

const fontMapping = styleguide => ({
  body: {
    bodyMobile: {
      fontFamily: styleguide.fonts.body,
      fontSize: styleguide.fontSizes.bodyMobile,
      lineHeight: styleguide.lineHeight({
        font: "body",
        fontSize: "bodyMobile"
      })
    },
    secondary: {
      fontFamily: styleguide.fonts.body,
      fontSize: styleguide.fontSizes.secondary,
      lineHeight: styleguide.lineHeight({ font: "body", fontSize: "secondary" })
    }
  }
});

export default scale => ({ font, fontSize }) => {
  const styleguide = timesStyleguide({ scale });
  const mapping = fontMapping(styleguide);
  return mapping[font][fontSize];
};
