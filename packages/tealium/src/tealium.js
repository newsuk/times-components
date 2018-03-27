console.log('*********** FOO');

import TealiumSendScheduler from "./tealium-send-scheduler";

function createTealiumReporter(options, w, d) {
  const utagSendScheduler = new TealiumSendScheduler(options, w, d);

  return {
    analytics(e) {
      utagSendScheduler.enqueue(e);
    }
  };
}

// import storybookReporter from './storybook';
// export { default as storybookReporter } from './storybook';
// export default createTealiumReporter;
export default () => undefined;
