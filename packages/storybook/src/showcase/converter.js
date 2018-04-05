import { storiesOf } from "@storybook/react-native";

const addStories = (builder, [child, ...children]) => {
  if (!child) {
    return;
  }

  if(child.type === 'story') {
    builder.add(child.name, () => child.component);
  }

  if(child.type === 'decorator') {
    builder.addDecorator(child.decorator);
  }

  addStories(builder, children);
};

const converter = (module, { name, children } = {}) => {
  addStories(storiesOf(name, module), children);
};

export default converter;
