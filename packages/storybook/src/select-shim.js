import { select } from "@storybook/addon-knobs/react";

export const reverseOptions = options => {
  const reversedOptions = {};
  Object.keys(options).forEach(key => {
    reversedOptions[options[key]] = key;
  });
  return reversedOptions;
};

const selectShim = (label, options, defaultValue, groupId) =>
  select(label, reverseOptions(options), defaultValue, groupId);

export default selectShim;
