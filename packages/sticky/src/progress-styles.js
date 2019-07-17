import { css } from "styled-components";

export const PROGRESS_ATTR_NAME = "data-sticky-progress";

export function applyProgressAttr(elem, percent) {
  if (percent) {
    const value = `${Math.floor(percent * 100)}`;

    elem.setAttribute(PROGRESS_ATTR_NAME, value);
  } else {
    elem.removeAttribute(PROGRESS_ATTR_NAME);
  }
}

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
