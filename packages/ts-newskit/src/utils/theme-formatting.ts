import { Theme, ThemeBase } from 'newskit';

const modifyBaseRemValue = (multiplier: number, valueToUpdate: string) => {
  const getVal = valueToUpdate.slice(0, -3);
  const updatedVal = multiplier * Number(getVal);

  return `${updatedVal}rem`;
};

const validFontNames = ['Roboto', 'Times Modern', 'Times Digital W04 Regular'];
const getFontFamilyFallbacks = (fontName: string) => {
  if (validFontNames.includes(fontName)) {
    let fontFamilies: string = `${fontName}, ${fontName}-fallback`;
    fontFamilies += fontName === 'Roboto' ? ', sans-serif' : ', serif';

    return fontFamilies;
  }

  return fontName;
};

export const updateThemeTypography = (themeObj: Theme) => {
  if (!themeObj.fonts.updated) {
    themeObj.fonts.updated = 1;

    // Update Borders
    themeObj.borders = Object.fromEntries(
      Object.entries(themeObj.borders).map(border => {
        const updatedVal =
          typeof border[1] === 'string' && border[1].includes('rem')
            ? modifyBaseRemValue(1.6, border[1])
            : border[1];

        return [border[0], updatedVal];
      })
    );

    // Update Font Sizes
    themeObj.fonts = Object.fromEntries(
      Object.entries(themeObj.fonts).map(font => {
        const updatedVal =
          typeof font[1] === 'string' && font[1].includes('rem')
            ? modifyBaseRemValue(1.6, font[1])
            : font[1];

        return [font[0], updatedVal];
      })
    );

    // Update FontFamily
    themeObj.fonts = Object.fromEntries(
      Object.entries(themeObj.fonts).map(font => {
        if (typeof font[0] === 'string' && font[0].indexOf('fontFamily') >= 0) {
          return [font[0], getFontFamilyFallbacks(font[1].fontFamily)];
        }
        return [font[0], font[1]];
      })
    );

    // Update Typography Presets
    Object.values(themeObj.typographyPresets).map(preset => {
      // Update Typography Presets : Font Size
      preset.fontSize =
        typeof preset.fontSize === 'string' && preset.fontSize.includes('rem')
          ? modifyBaseRemValue(1.6, preset.fontSize)
          : preset.fontSize;

      // Update Typography Presets : Font FontFamily
      preset.fontFamily =
        typeof preset.fontFamily === 'string' &&
        validFontNames.includes(preset.fontFamily)
          ? getFontFamilyFallbacks(preset.fontFamily)
          : preset.fontFamily;
    });
  }

  return themeObj;
};

export const addOverride = (
  updatedThemeObj: Theme,
  themeOverrides: ThemeBase
) => {
  Object.entries(themeOverrides).forEach(themeOverride => {
    const [key, value] = themeOverride;
    updatedThemeObj[key as keyof ThemeBase] = {
      ...updatedThemeObj[key as keyof ThemeBase],
      ...value
    };
  });

  return updatedThemeObj;
};

export const formatThemeOverrides = (
  themeObj: Theme,
  themeOverrides?: ThemeBase
) => {
  const breakpoints = {
    xs: 0,
    sm: 520,
    md: 768,
    lg: 1024,
    xl: 1320
  };

  const updatedThemeTypography = updateThemeTypography(themeObj);

  updatedThemeTypography.breakpoints = breakpoints;

  let addOverrides: ThemeBase | undefined;
  if (!addOverrides && themeOverrides) {
    addOverrides = addOverride(updatedThemeTypography, themeOverrides);
  }

  return {
    overrides: {
      ...updatedThemeTypography,
      ...addOverrides
    }
  };
};
