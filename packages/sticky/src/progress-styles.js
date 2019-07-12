import { css } from "styled-components";

const PROGRESS_ATTR_NAME = "data-sticky-progress";

export function applyProgressAttr(elem, percent) {
  if (percent) {
    const value = `${Math.floor(percent * 100)}`;

    elem.setAttribute(PROGRESS_ATTR_NAME, value);
  } else {
    elem.removeAttribute(PROGRESS_ATTR_NAME);
  }
}

// @todo Make this styles not render on the server as its impossible for
// them to be used there and its too much to transfer over the network
export function computeProgressStyles(computer) {
  const progressArr = new Array(101).fill(null);

  return progressArr.map((_, progress) => {
    const percent = progress / 100;
    const attrSelector = `[${PROGRESS_ATTR_NAME}="${progress}"]`;

    return css`
      &${attrSelector} {
        ${computer(percent)};
      }
    `;
  });
}
