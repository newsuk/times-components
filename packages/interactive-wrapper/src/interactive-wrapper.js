/* eslint-env browser */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Placeholder } from "@times-components/image";

function ensureElement(selector, createElement) {
  if (document.body.querySelector(selector)) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const element = createElement();

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

export function polyfillWCIfNecessary() {
  const htmlImportsSupported = "import" in document.createElement("link");
  const registerElementSupported = !!document.registerElement;

  if (!htmlImportsSupported || !registerElementSupported) {
    return Promise.all([
      ensureScript(
        "https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/webcomponents-lite.min.js"
      ),
      new Promise(resolve => {
        window.addEventListener("WebComponentsReady", resolve);
      })
    ]);
  }

  return Promise.resolve();
}

export default class InteractiveWrapper extends Component {
  constructor(props) {
    super(props);

    this.placeholder = React.createRef(null);
    this.component = React.createRef(null);
  }

  componentDidMount() {
    const { fetchPolyfill } = this.props;

    fetchPolyfill().then(() => {
      this.insertComponent();
    });
  }

  componentDidUpdate() {
    this.insertComponent();
  }

  async insertComponent() {
    const { attributes, element, source } = this.props;
    const placeholder = this.placeholder.current;
    const component = this.component.current;

    component.innerHTML = "";
    placeholder.style.cssText += "display: block !important";

    // It is possible for insertComponent to have been called again whilst the
    // import link tag was loading. and therefore it is possible for multiple
    // interactives to be inserted – therefore, we ensure that the interactive
    // container is empty before inserting
    component.innerHTML = "";

    const newElement = document.createElement(element);

    Object.keys(attributes).forEach(key =>
      newElement.setAttribute(key, attributes[key])
    );

    component.appendChild(newElement);
    // Do not remove this. This seems to notify polymer to correctly
    // render the web component in more circumstances, specifically,
    // its required to correctly re-render after a react re-render
    newElement.outerHTML += "";

    placeholder.style.cssText += "display: none !important";

    await ensureImport(source);
  }

  render() {
    return (
      <>
        <div
          ref={this.placeholder}
          style={{ height: 150, position: "relative" }}
        >
          <Placeholder />
        </div>
        <div ref={this.component} />
      </>
    );
  }
}

InteractiveWrapper.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  fetchPolyfill: PropTypes.func
};

InteractiveWrapper.defaultProps = {
  attributes: {},
  fetchPolyfill: polyfillWCIfNecessary
};
