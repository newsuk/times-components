import { storiesOf } from "@storybook/react-native";
import { color } from "@storybook/addon-knobs/react";

const makeKnobs = (knobs, knob) => {
  if (knob === "colour") {
    return {
      ...knobs,
      colour: color
    };
  }

  return knobs;
};

const addStories = (builder, [child, ...children]) => {
  if (!child) {
    return;
  }

  if (child.type === "story") {
    const args = child.knobs ? [child.knobs.reduce(makeKnobs, {})] : [];

    builder.add(child.name, () => child.component(...args));
  }

  if (child.type === "decorator") {
    builder.addDecorator(child.decorator);
  }

  addStories(builder, children);
};

const converter = (module, { name, children } = {}) =>
  addStories(storiesOf(name, module), children);

export default converter;
