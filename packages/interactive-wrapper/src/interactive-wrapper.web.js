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
    const placeholder = this.placeholder.current;
    const { parentNode } = placeholder;

    const element = document.createElement(this.props.element);
    const link = document.createElement("link");

    link.setAttribute("href", this.props.source);
    link.setAttribute("rel", "import");

    Object.keys(this.props.attributes).forEach(key =>
      element.setAttribute(key, this.props.attributes[key])
    );

    parentNode.replaceChild(element, placeholder);
    parentNode.insertBefore(link, element);

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
