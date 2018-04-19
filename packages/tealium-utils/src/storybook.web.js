// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";
import tealiumReporter, {
  TealiumSendScheduler
} from "@times-components/tealium";

const trackingOptions = {
  enabled: true,
  account: "newsinternational",
  profile: "thetimes.2018",
  env: "dev"
};

const tealiumSendScheduler = new TealiumSendScheduler(
  trackingOptions,
  global.window,
  global.document
);

const reporter = tealiumReporter(tealiumSendScheduler);

export default e => {
  if (reporter) reporter.analytics(e);

  if (!global.storiesOf) action("analytics-event")(e);
};
