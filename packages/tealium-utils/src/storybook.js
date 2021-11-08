import { action } from "@storybook/addon-actions";
import tealiumReporter, {
  TealiumSendScheduler
} from "@times-components/tealium";

const trackingOptions = {
  account: "newsinternational",
  enabled: true,
  env: "dev",
  profile: "thetimes.2018"
};

const tealiumSendScheduler = new TealiumSendScheduler(
  trackingOptions,
  global.window,
  global.document
);

const reporter = tealiumReporter(tealiumSendScheduler);

export default e => {
  if (reporter) reporter.analytics(e);

  return action("analytics-event")(e);
};
