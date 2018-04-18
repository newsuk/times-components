import { Platform } from "react-native";

const addStories = (builder, knobs, actions, [child, ...children]) => {
  if (!child) {
    return;
  }

  if (child.type === "story") {
    const args = [knobs, actions];

    builder.add(child.name, () => child.component(...args));
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
