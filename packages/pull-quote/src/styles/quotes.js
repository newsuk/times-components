import { styleguide } from "@times-components/ts-components";

const { fonts, spacing } = styleguide();

const quoteMargins = {
  cultureMagazine: {
    marginLeft: -3
  },
  stMagazine: {
    marginLeft: -2
  },
  styleMagazine: {
    marginLeft: -5
  }
};

const quoteStyleFactory = fontName => ({
  ...(quoteMargins[fontName] || {}),
  fontFamily: fonts[fontName] || fonts.headlineRegular,
  fontSize: 75,
  marginBottom: spacing(-8),
  marginTop: 0
});

export default quoteStyleFactory;
