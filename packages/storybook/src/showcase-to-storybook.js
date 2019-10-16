import React, { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import { addUserStateKnobs } from "@times-components/user-state";
import { ThemeProvider } from "newskit";
import { newskitTheme } from "@times-components/utils";

React.Fragment = ({ children }) => children;
React.Fragment.propTypes = {
  children: PropTypes.node.isRequired
};
React.Fragment.displayName = "React.Fragment";

// eslint-disable-next-line react/prop-types
export const StrictWrapper = ({ children }) => (
  <StrictMode>
    <HelmetProvider context={{}}>
      <ThemeProvider theme={newskitTheme || {}}>{children}</ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);

const addStories = (
  builder,
  knobs,
  actions,
  [child, ...children],
  strictMode = true
) => {
  if (!child) {
    return;
  }

  if (child.type === "story") {
    const args = [knobs, actions];

    builder.add(child.name, () => {
      if (Platform.OS === "web") {
        addUserStateKnobs(child.defaultUserState);
      }

      return strictMode ? (
        <StrictWrapper>{child.component(...args)}</StrictWrapper>
      ) : (
        child.component(...args)
      );
    });
  }

  if (child.type === "decorator") {
    builder.addDecorator(child.decorator);
  }

  addStories(builder, knobs, actions, children);
};

export const isCorrectPlatform = ({ platform }) =>
  !platform ||
  platform === Platform.OS ||
  (platform === "native" && Platform.OS !== "web");

const converter = (storiesOf, knobs, actions) => (
  module,
  { name, children = [] } = {},
  strictMode
) =>
  addStories(
    storiesOf(name, module),
    knobs,
    actions,
    children.filter(isCorrectPlatform),
    strictMode
  );

export default converter;
