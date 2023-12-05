/* eslint-env jest */

export const advance = ms => {
  jest.runTimersToTime(ms);
  return Promise.resolve();
};

export const delay = ms => new Promise(done => setTimeout(done, ms));

export const delayAndAdvance = ms => {
  const timer = delay(ms);
  advance(ms);
  return timer;
};
