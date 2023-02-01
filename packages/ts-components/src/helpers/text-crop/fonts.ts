import keyBy from 'lodash.keyby';

export const fonts = {
  body: 'TimesDigitalW04',
  bodyRegular: 'TimesDigitalW04-Regular',
  bodyRegularSmallCaps: 'TimesDigitalW04-RegularSC',
  cultureMagazine: 'TimesModern-Bold',
  dropCap: 'TimesModern-Regular',
  headline: 'TimesModern-Bold',
  headlineRegular: 'TimesModern-Regular',
  stMagazine: 'TimesModern-Bold',
  styleMagazine: 'TimesModern-Bold',
  supporting: 'Roboto-Regular'
};

export type Font = keyof typeof fonts;

export type FontTextCropSettings = {
  font: string;
  topCrop: number;
  bottomCrop: number;
  cropFontSize: number;
  cropLineHeight: number;
};

const TimesModernBold: FontTextCropSettings = {
  font: 'TimesModern-Bold',
  topCrop: 11,
  bottomCrop: 23,
  cropFontSize: 64,
  cropLineHeight: 1.2
};
const TimesModernRegular: FontTextCropSettings = {
  font: 'TimesModern-Regular',
  topCrop: 11,
  bottomCrop: 23,
  cropFontSize: 64,
  cropLineHeight: 1.2
};
const TimesDigitalW04: FontTextCropSettings = {
  font: 'TimesDigitalW04',
  topCrop: 14,
  bottomCrop: 18,
  cropFontSize: 64,
  cropLineHeight: 1.2
};
const TimesDigitalW04Regular: FontTextCropSettings = {
  font: 'TimesDigitalW04-Regular',
  topCrop: 14,
  bottomCrop: 18,
  cropFontSize: 64,
  cropLineHeight: 1.2
};
const TimesDigitalW04RegularSC: FontTextCropSettings = {
  font: 'TimesDigitalW04-RegularSC',
  topCrop: 14,
  bottomCrop: 18,
  cropFontSize: 64,
  cropLineHeight: 1.2
};

const robotoRegular: FontTextCropSettings = {
  font: 'Roboto-Regular',
  topCrop: 6,
  bottomCrop: 26,
  cropFontSize: 64,
  cropLineHeight: 1.2
};

const robotoMedium: FontTextCropSettings = {
  font: 'Roboto-Medium',
  topCrop: 6,
  bottomCrop: 26,
  cropFontSize: 64,
  cropLineHeight: 1.2
};

const fontCropSettings: { [font: string]: FontTextCropSettings } = keyBy(
  [
    TimesModernBold,
    TimesModernRegular,
    TimesDigitalW04,
    TimesDigitalW04Regular,
    TimesDigitalW04RegularSC,
    robotoRegular,
    robotoMedium
  ],
  ({ font }) => font
);

export const getFontCropSettings = (font: Font) => {
  return (
    fontCropSettings[fonts[font]] || {
      font: fonts[font],
      topCrop: 0,
      bottomCrop: 0,
      cropFontSize: 0,
      cropLineHeight: 1.2
    }
  );
};
