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

const addStories = (builder, knobs, actions, [child, ...children]) => {
  if (!child) {
    return;
  }

  if (child.type === "story") {
    const args = [knobs, actions];

    builder.add(child.name, () => (
      <StrictWrapper>{child.component(...args)}</StrictWrapper>
    ));
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
  { name, children = [] } = {}
) =>
  addStories(
    storiesOf(name, module),
    knobs,
    actions,
    children.filter(isCorrectPlatform)
  );

export default converter;
