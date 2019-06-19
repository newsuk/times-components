/**
 * This package depends on more extensive DOM APIs than what js-dom provides
 * and therefore we need to provide our own implementations for those APIs.
 *
 * This file does not attempt to fully implement those APIs. Instead, it only
 * implements the features of those APIs that we make use of
 */

/* eslint-env browser */

Object.defineProperties(window.HTMLElement.prototype, {
  offsetLeft: {
    get() {
      return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
    }
  },
  offsetTop: {
    get() {
      return parseFloat(window.getComputedStyle(this).marginTop) || 0;
    }
  },
  offsetHeight: {
    get() {
      return parseFloat(window.getComputedStyle(this).height) || 0;
    }
  },
  offsetWidth: {
    get() {
      return parseFloat(window.getComputedStyle(this).width) || 0;
    }
  },
  getBoundingClientRect: {
    value() {
      let top = -window.pageYOffset;
      let node = this;

      while (node !== document.body) {
        top += node.offsetTop;
        node = node.parentNode;
      }

      return { top };
    }
  }
});
