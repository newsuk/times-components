import { selectV2 } from "@storybook/addon-knobs/react";

export const reverseOptions = options => {
  const reversedOptions = {};
  Object.keys(options).forEach(key => {
    reversedOptions[options[key]] = key;
  });
  return reversedOptions;
};

// storybook 3.4 deprecated select, and the deprecation mechanism crashes storybook, so use selectV2
const selectShim = (label, options, defaultValue, groupId) =>
  selectV2(label, reverseOptions(options), defaultValue, groupId);

export default selectShim;
