/* eslint-disable import/prefer-default-export,prefer-destructuring */
/* eslint-env browser */

export const getTop = node => node.getBoundingClientRect().top;

export const getTopFromBody = node => (getTop(node) || 0) + window.pageYOffset;

export const isOutOfView = (node, top) => getTop(node) <= top;

const matchMedia =
  (typeof window !== "undefined" && window.matchMedia) ||
  (() => ({ matches: true }));

export function mediaQuery(query) {
  const mql = matchMedia(query);

  return () => mql.matches;
}
