import { NativeModules } from "react-native";

const { ReactConfig: { timezone = "" } = { timezone: "" } } = NativeModules;

export default () => timezone;
