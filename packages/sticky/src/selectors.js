import { css } from "styled-components";

export const STICKY_CLASS_NAME = "tc-sticky";
export const CONTAINS_STICKY_CLASSNAME = `contains-${STICKY_CLASS_NAME}`;

const sticky = styles =>
  css`
    &.${STICKY_CLASS_NAME} {
      ${styles};
    }
  `;

const containsSticky = styles => css`
  &.${CONTAINS_STICKY_CLASSNAME} {
    ${styles};
  }
`;

const sizer = styles => css`
  [data-tc-sticky-sizer] {
    ${styles};
  }
`;

const stickySizer = styles => sticky(sizer(styles));

export const selectors = {
  sticky,
  containsSticky,
  sizer,
  stickySizer
};
