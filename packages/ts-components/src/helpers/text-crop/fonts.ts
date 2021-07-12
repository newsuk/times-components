import keyBy from 'lodash.keyby';

export const fonts = {
  body: 'TimesDigitalW04',
  bodyRegular: 'TimesDigitalW04-Regular',
  bodyRegularSmallCaps: 'TimesDigitalW04-RegularSC',
  cultureMagazine: 'Flama-Bold',
  dropCap: 'TimesModern-Regular',
  headline: 'TimesModern-Bold',
  headlineRegular: 'TimesModern-Regular',
  stMagazine: 'Tiempos-Headline-Bold',
  styleMagazine: 'CenturyGothic-Bold',
  supporting: 'GillSansMTStd-Medium'
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

const GillSansMTStdMedium: FontTextCropSettings = {
  font: 'GillSansMTStd-Medium',
  topCrop: 6,
  bottomCrop: 26,
  cropFontSize: 64,
  cropLineHeight: 1.2
};

const FlamaBold: FontTextCropSettings = {
  font: 'Flama-Bold',
  topCrop: 19,
  bottomCrop: 13,
  cropFontSize: 64,
  cropLineHeight: 1.2
};
const TiemposHeadlineBold: FontTextCropSettings = {
  font: 'Tiempos-Headline-Bold',
  topCrop: 16,
  bottomCrop: 17,
  cropFontSize: 64,
  cropLineHeight: 1.2
};
const CenturyGothicBold: FontTextCropSettings = {
  font: 'CenturyGothic-Bold',
  topCrop: 16,
  bottomCrop: 16,
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
    GillSansMTStdMedium,
    FlamaBold,
    TiemposHeadlineBold,
    CenturyGothicBold
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
