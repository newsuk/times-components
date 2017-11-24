import { Platform } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
// eslint-disable-next-line import/no-extraneous-dependencies
import tealiumReporter from "../packages/tracking/tealium/tealium-reporter";

const trackingConfig = {
  enabled: true,
  account: "newsinternational",
  profile: "thetimes.desktop.2017",
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
