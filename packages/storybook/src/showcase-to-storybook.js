import React, { StrictMode } from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";

React.Fragment = ({ children }) => children;
React.Fragment.propTypes = {
  children: PropTypes.node.isRequired
};
React.Fragment.displayName = "React.Fragment";

// eslint-disable-next-line react/prop-types
const StrictWrapper = ({ children }) => <StrictMode>{children}</StrictMode>;

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

    builder.add(
      child.name,
      () =>
        strictMode ? (
          <StrictWrapper>{child.component(...args)}</StrictWrapper>
        ) : (
          child.component(...args)
        )
    );
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
