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
    },
    tertiary: {
      fontFamily: styleguide.fonts.body,
      fontSize: styleguide.fontSizes.tertiary,
      lineHeight: styleguide.lineHeight({ font: "body", fontSize: "tertiary" })
    }
  },
  headline: {
    pageComponentHeadline: {
      fontFamily: styleguide.fonts.headline,
      fontSize: styleguide.fontSizes.pageComponentHeadline,
      lineHeight: styleguide.lineHeight({ font: "headline", fontSize: "pageComponentHeadline" })
    },
    pageHeadline: {
      fontFamily: styleguide.fonts.headline,
      fontSize: styleguide.fontSizes.pageHeadline,
      lineHeight: styleguide.lineHeight({ font: "headline", fontSize: "pageHeadline" })
    },
    smallHeadline: {
      fontFamily: styleguide.fonts.headline,
      fontSize: styleguide.fontSizes.smallHeadline,
      lineHeight: styleguide.lineHeight({ font: "headline", fontSize: "smallHeadline" })
    }
  },
  supporting: {
    cardMetaMobile: {
      fontFamily: styleguide.fonts.supporting,
      fontSize: styleguide.fontSizes.cardMetaMobile,
      lineHeight: styleguide.lineHeight({ font: "supporting", fontSize: "cardMetaMobile" })
    }
  }
});

export default scale => ({ font, fontSize }) => {
  const styleguide = timesStyleguide({ scale });
  const mapping = fontMapping(styleguide);
  return mapping[font][fontSize];
};
