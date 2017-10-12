import { configure } from "@storybook/react";

const req = require.context(
  "../packages",
  true,
  /^((?!node_modules).)*\.(stories|stories.web)\.js$/
);

const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);
