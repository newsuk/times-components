import { AppRegistry } from "react-native";
import Expo, { Font } from "expo";
import Fructose from "@times-components/fructose";
// eslint-disable-next-line import/no-unresolved
import { loadStories } from "./components";

AppRegistry.registerComponent("storybooknative", () => Fructose(loadStories));

Font.loadAsync({
    "GillSansMTStd-Medium": require(`../dist/public/fonts/GillSansMTStd-Medium.ttf`),
    "TimesDigitalW04-Regular": require(`../dist/public/fonts/TimesDigitalW04-Regular.ttf`),
    "TimesDigitalW04-RegularSC": require(`../dist/public/fonts/TimesDigitalW04-RegularSC.ttf`),
    "TimesDigitalW04": require(`../dist/public/fonts/TimesDigitalW04.ttf`),
    "TimesDigitalW04_bold": require(`../dist/public/fonts/TimesDigitalW04_bold.ttf`),
    "TimesDigitalW04_italic": require(`../dist/public/fonts/TimesDigitalW04_italic.ttf`),
    "TimesModern-Bold": require(`../dist/public/fonts/TimesModern-Bold.ttf`),
    "TimesModern-Regular": require(`../dist/public/fonts/TimesModern-Regular.ttf`),
});
