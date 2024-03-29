import { Theme, ThemeBase } from 'newskit';

const modifyBaseRemValue = (multiplier: number, valueToUpdate: string) => {
  const getVal = valueToUpdate.slice(0, -3);
  const updatedVal = multiplier * Number(getVal);

  return `${updatedVal}rem`;
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

    // Update Typography Presets
    Object.values(themeObj.typographyPresets).map(preset => {
      preset.fontSize =
        typeof preset.fontSize === 'string' && preset.fontSize.includes('rem')
          ? modifyBaseRemValue(1.6, preset.fontSize)
          : preset.fontSize;
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
