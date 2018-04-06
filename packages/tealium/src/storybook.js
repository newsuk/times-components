import { Platform } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
import tealiumReporter from "./tealium";

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

  if (!global.storiesOf) action("analytics-event")(e);
};
