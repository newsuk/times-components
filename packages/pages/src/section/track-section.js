import { NativeModules } from "react-native";

const { track } = NativeModules.ReactAnalytics;
const { onSectionLoaded } = NativeModules.SectionEvents || {
  onSectionLoaded: () => {}
};

export default event => {
  if (event.object === "Section" && event.action === "Viewed") {
    onSectionLoaded(event.attrs.sectionName, event);
  }
  track(event);
};
