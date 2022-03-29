import React, { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";
import { addUserStateKnobs } from "@times-components/user-state";

React.Fragment = ({ children }) => children;
React.Fragment.propTypes = {
  children: PropTypes.node.isRequired
};
React.Fragment.displayName = "React.Fragment";

// eslint-disable-next-line react/prop-types
export const StrictWrapper = ({ children }) => (
  <StrictMode>
    <HelmetProvider context={{}}>{children}</HelmetProvider>
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
      addUserStateKnobs(child.defaultUserState);

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

export const isCorrectPlatform = ({ platform }) => !platform || platform;

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
