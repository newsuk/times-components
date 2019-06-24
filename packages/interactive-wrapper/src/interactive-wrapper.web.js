/* eslint-env browser */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Placeholder } from "@times-components/image";

const HTML_IMPORTS_SUPPORTED = "import" in document.createElement("link");
const REGISTER_ELEMENT_SUPPORTED = !!document.registerElement;

function ensureElement(selector, createElement) {
  let element = document.body.querySelector(selector);

  if (element) {
    return Promise.resolve();
  }

  element = createElement();

  return new Promise((resolve, reject) => {
    element.onload = resolve;
    element.onerror = reject;

    document.body.appendChild(element);
  });
}

function ensureScript(src) {
  return ensureElement(`script[src="${src}"]`, () => {
    const script = document.createElement("script");
    script.setAttribute("async", "async");
    script.setAttribute("src", src);

    return script;
  });
}

function ensureImport(src) {
  return ensureElement(`link[href="${src}"]`, () => {
    const link = document.createElement("link");
    link.setAttribute("href", src);
    link.setAttribute("rel", "import");

    return link;
  });
}

function polyfillWCIfNecessary() {
  if (!HTML_IMPORTS_SUPPORTED || !REGISTER_ELEMENT_SUPPORTED) {
    return Promise.all([
      ensureScript("https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/webcomponents-lite.min.js"),
      new Promise(resolve => {
        window.addEventListener("WebComponentsReady", resolve);
      })
    ])
  }
}

export default class InteractiveWrapper extends Component {
  constructor(props) {
    super(props);

    this.placeholder = React.createRef(null);
    this.component = React.createRef(null);
    this.whenReady = null;
  }

  async componentDidMount() {
    this.whenReady = polyfillWCIfNecessary();

    await this.insertComponent();
  }

  async componentDidUpdate() {
    await this.insertComponent();
  }

  async insertComponent() {
    await this.whenReady;

    const { attributes, element, source } = this.props;
    const placeholder = this.placeholder.current;
    const component = this.component.current;

    component.innerHTML = "";
    placeholder.style.cssText += "display: block !important";

    const newElement = document.createElement(element);

    Object.keys(attributes).forEach(key =>
      newElement.setAttribute(key, attributes[key])
    );

    component.appendChild(newElement);

    // Do not remove this. This seems to notify polymer to correctly
    // render the web component correctly in more circumstances
    // specifically, its required to correctly re-render after a react re-render
    newElement.outerHTML += "";

    await ensureImport(source);
    placeholder.style.cssText += "display: none !important";
  }

  render() {
    return (
      <>
        <div
          ref={this.placeholder}
          style={{ height: 150, position: "relative" }}
        >
          <Placeholder borderRadius={false} />
        </div>
        <div ref={this.component} />
      </>
    );
  }
}

InteractiveWrapper.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
};
InteractiveWrapper.defaultProps = {
  attributes: {}
};
