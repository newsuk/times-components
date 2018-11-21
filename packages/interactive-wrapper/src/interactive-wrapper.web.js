/* eslint-env browser */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class InteractiveWrapper extends Component {
  constructor(props) {
    super(props);
    this.placeholder = React.createRef(null);
  }

  componentDidMount() {
    const { attributes, element, source } = this.props;
    const placeholder = this.placeholder.current;
    const { parentNode } = placeholder;

    const newElement = document.createElement(element);
    const link = document.createElement("link");

    link.setAttribute("href", source);
    link.setAttribute("rel", "import");

    Object.keys(attributes).forEach(key =>
      newElement.setAttribute(key, attributes[key])
    );

    parentNode.replaceChild(newElement, placeholder);
    parentNode.insertBefore(link, newElement);

    delete this.placeholder.current;
  }

  render() {
    return <div ref={this.placeholder} />;
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
