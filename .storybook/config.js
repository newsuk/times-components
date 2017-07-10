import { configure } from "@storybook/react";

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.stories\.js$/
);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
