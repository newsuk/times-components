import { selectV2 } from "@storybook/addon-knobs/react";

// storybook 3.4 deprecated select, and the deprecation mechanism crashes storybook, so use selectV2
const selectShim = (label, options, defaultValue, groupId) => {
  const reversedOptions = {};
  Object.keys(options).forEach(key => {
    reversedOptions[options[key]] = key;
  });
  return selectV2(label, reversedOptions, defaultValue, groupId);
};

export default selectShim;
