import { storiesOf } from "@storybook/react-native";
import { color, select } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";

const addStories = (builder, [child, ...children]) => {
  if (!child) {
    return;
  }

  if (child.type === "story") {
    const args = [
      {
        colour: color,
        select
      },
      action
    ];

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
