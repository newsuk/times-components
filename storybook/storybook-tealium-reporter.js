import { Platform } from "react-native";
import { action } from "@storybook/addon-actions";
import tealiumReporter from "../packages/tracking/tealium/tealium-reporter";

const trackingConfig = {
  enabled: true,
  account: "newsinternational",
  profile: "thetimes.2018",
  env: "dev"
};

const reporter =
  Platform.OS === "web"
    ? tealiumReporter(trackingConfig, global.window, global.document)
    : null;

export default e => {
  if (reporter) reporter.analytics(e);
  action("analytics-event")(e);
};
