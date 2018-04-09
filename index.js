/* eslint-disable import/no-unresolved */

import Expo, { Font } from "expo";
import Fructose from "./fructose/index";
import GillSansMTStd from "./dist/public/fonts/GillSansMTStd-Medium.ttf";
import TimesDigitalW04R from "./dist/public/fonts/TimesDigitalW04-Regular.ttf";
import TimesDigitalW04SC from "./dist/public/fonts/TimesDigitalW04-RegularSC.ttf";
import TimesDigitalW04 from "./dist/public/fonts/TimesDigitalW04.ttf";
import TimesDigitalW04B from "./dist/public/fonts/TimesDigitalW04_bold.ttf";
import TimesDigitalW04I from "./dist/public/fonts/TimesDigitalW04_italic.ttf";
import TimesModernB from "./dist/public/fonts/TimesModern-Bold.ttf";
import TimesModernR from "./dist/public/fonts/TimesModern-Regular.ttf";

Expo.registerRootComponent(Fructose);

Font.loadAsync({
  "GillSansMTStd-Medium": GillSansMTStd,
  "TimesDigitalW04-Regular": TimesDigitalW04R,
  "TimesDigitalW04-RegularSC": TimesDigitalW04SC,
  TimesDigitalW04,
  TimesDigitalW04_bold: TimesDigitalW04B,
  TimesDigitalW04_italic: TimesDigitalW04I,
  "TimesModern-Bold": TimesModernB,
  "TimesModern-Regular": TimesModernR
});
