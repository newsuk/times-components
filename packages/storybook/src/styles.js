/* eslint-disable import/prefer-default-export */
/* eslint-env browser */
import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";

export function createScopedGlobalStyle(strings, ...attrs) {
  const className = `scoped-style-${Math.random()
    .toString(36)
    .substr(2, 5)}`;
  const copiedStrings = [...strings];
  copiedStrings[0] = `.${className} { ${copiedStrings[0]}`;
  copiedStrings[copiedStrings.length - 1] = `${
    copiedStrings[copiedStrings.length - 1]
  } }`;

  const InnerStyleComponent = createGlobalStyle(copiedStrings, ...attrs);
  class GlobalStyle extends Component {
    componentDidMount() {
      document.documentElement.classList.add(className);
    }

    componentWillUnmount() {
      document.documentElement.classList.remove(className);
    }

    render() {
      return <InnerStyleComponent />;
    }
  }

  return GlobalStyle;
}
