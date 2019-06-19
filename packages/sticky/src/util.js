/* eslint-disable import/prefer-default-export,prefer-destructuring */
/* eslint-env browser */

export const getTop = node => node.getBoundingClientRect().top;

export const getTopFromBody = node => (getTop(node) || 0) + window.pageYOffset;

export const isOutOfView = (node, top) => getTop(node) <= top + 1;

export function getOuterVerticalStyle(node) {
  const styles = window.getComputedStyle(node);

  return {
    marginTop: styles.marginTop,
    marginBottom: styles.marginBottom,
    height: `${node.offsetHeight}px`
  };
}
