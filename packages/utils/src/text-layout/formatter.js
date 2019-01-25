import { glue, box, penalty, infinity } from "./knuth";

export const defaults = {
  space: {
    shrink: 9,
    stretch: 6,
    width: 3
  }
};

const formatters = words => ({
  left() {
    const nodes = [];

    const spaces = words
      .map((word, i) => (word.value === " " ? [word.width, i] : null))
      .filter(pair => pair !== null);
    for (let i = 0; i < words.length; i += 1) {
      if (spaces[0][1] < i) {
        spaces.shift();
      }
      const spaceWidth = spaces[0][0];
      const word = words[i].value;
      nodes.push(box(words[i].width, i, word));
      if (i === words.length - 1) {
        nodes.push(glue(0, infinity, 0));
        nodes.push(penalty(0, -infinity, 1));
      } else {
        nodes.push(glue(0, 12, 0));
        nodes.push(penalty(0, 0, 0));
        nodes.push(glue(spaceWidth, -12, 0));
      }
    }
    return nodes;
  }
});

export default formatters;
