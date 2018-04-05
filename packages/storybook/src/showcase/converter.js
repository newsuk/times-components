import { storiesOf } from "@storybook/react-native";

const addStories = (builder, [story, ...stories]) => {
  if (!story) {
    return;
  }

  builder.add(story.name, () => story.component);

  addStories(builder, stories);
};

const converter = (module, { name, stories } = {}) => {
  addStories(storiesOf(name, module), stories);
};

export default converter;
