import { Theme } from "newskit";

const modifyBaseRemValue = (multiplier: number, valueToUpdate: string) => {
  const getVal = valueToUpdate.slice(0, -3);
  const updatedVal = multiplier * Number(getVal);
  
  return `${updatedVal}rem`
}

const modifyFontFamilyValue = (family: string, weight?: number) => {
  let updatedFont = family;
  switch (family) {
    case "Roboto":
      updatedFont = weight && weight > 500 ? "Roboto-Medium" : "Roboto-Regular"
      break;
    case "Times Modern":
      updatedFont = weight && weight > 500 ? "TimesModern-Bold" : "TimesModern-Regular"
      break;
    case "Times Digital W04 Regular":
      updatedFont = "TimesDigitalW04-Regular"
      break;
  
    default:
      family
      break;
  }

  return updatedFont;
}

  
export const updateThemeTypography = (themeObj: Theme) => {
  // Update Borders
  themeObj.borders = Object.fromEntries(
    Object.entries(themeObj.borders).map(border => {
      const updatedVal = typeof(border[1]) === 'string' && border[1].includes("rem")
        ? modifyBaseRemValue(1.6, border[1])
        : border[1]
      
      return [border[0], updatedVal]
    })
  );

  // Update Font Sizes
  themeObj.fonts = Object.fromEntries(
    Object.entries(themeObj.fonts).map(font => {
      const updatedVal = typeof(font[1]) === 'string' && font[1].includes("rem")
      ? modifyBaseRemValue(1.6, font[1])
      : font[1]
      
      return [font[0], updatedVal]
    })
  );

  // Update Font Families
  Object.values(themeObj.fonts).map(font => {
    if(font.fontFamily) {
      font.fontFamily = font.fontFamily
        ? modifyFontFamilyValue(font.fontFamily)
        : null      
    }
  });  

  // Update Typography Presets
  Object.values(themeObj.typographyPresets).map(preset => {
    preset.fontFamily = modifyFontFamilyValue(String(preset.fontFamily), Number(preset.fontWeight));
    preset.fontWeight = 400;

    preset.fontSize = typeof(preset.fontSize) === 'string' && preset.fontSize.includes("rem")
      ? modifyBaseRemValue(1.6, preset.fontSize)
      : preset.fontSize;
  });  
  
  return themeObj;
}
  
export const formatThemeOverrides = (themeObj: Theme, stylePresets = {}, typographyPresets = {}) => {
  const updatedThemeTypography = updateThemeTypography(themeObj);
  console.log("updatedThemeTypography: ", updatedThemeTypography)

  return {
    overrides: {
      ...updatedThemeTypography,
      breakpoints: {
        xs: 0,
        sm: 520,
        md: 768,
        lg: 1024,
        xl: 1320
      },
      typographyPresets: {
        ...updatedThemeTypography.typographyPresets,
        ...typographyPresets
      },
      stylePresets
    }  
  }
}