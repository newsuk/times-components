// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from "@storybook/addon-actions";

export default e => action("analytics-event")(e);
