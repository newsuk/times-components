import timesStyleguide from "../styleguide";

const mapping = styleguide => ({
  body: {
    secondary: {
      fontFamily: styleguide.fonts.body,
      fontSize: styleguide.fontSizes.secondary,
      lineHeight: styleguide.lineHeight({font: "body", fontSize: "secondary"})
    }
  }
});

export default (scale) => ({font, fontSize}) => {
  const styleguide = timesStyleguide({scale});
  const internalMapping = mapping(styleguide);
  return internalMapping[font][fontSize];
};
